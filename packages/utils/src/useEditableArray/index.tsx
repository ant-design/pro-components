/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import type { FormInstance, FormProps } from 'antd';
import { Form, message, Popconfirm } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import useLazyKVMap from 'antd/lib/table/hooks/useLazyKVMap';
import type { GetRowKey } from 'antd/lib/table/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import get from 'rc-util/lib/utils/get';
import set from 'rc-util/lib/utils/set';
import { noteOnce } from 'rc-util/lib/warning';
import React, {
  createRef,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDebounceFn, useRefFunction } from '..';
import { ProFormContext } from '../components/ProFormContext';
import { useDeepCompareEffectDebounce } from '../hooks/useDeepCompareEffect';
import { usePrevious } from '../hooks/usePrevious';
import { merge } from '../merge';
import { useMountMergeState } from '../useMountMergeState';

/**
 * 兼容antd@4 和 antd@5 的warning
 * @param messageStr
 */
const warning = (messageStr: React.ReactNode) => {
  // @ts-ignore
  return (message.warn || message.warning)(messageStr);
};

export type RowEditableType = 'single' | 'multiple';

export type RecordKey = React.Key | React.Key[];

export const recordKeyToString = (rowKey: RecordKey): React.Key => {
  if (Array.isArray(rowKey)) return rowKey.join(',');
  return rowKey;
};

export type AddLineOptions = {
  position?: 'top' | 'bottom';
  recordKey?: RecordKey;
  newRecordType?: 'dataSource' | 'cache';
  /** 要增加到哪个节点下，一般用于多重嵌套表格 */
  parentKey?: RecordKey;
};

export type NewLineConfig<T> = {
  defaultValue?: T;
  options: AddLineOptions;
};

export type ActionRenderFunction<T> = (
  row: T,
  config: ActionRenderConfig<T, NewLineConfig<T>>,
  defaultDoms: {
    save: React.ReactNode;
    delete: React.ReactNode;
    cancel: React.ReactNode;
  },
) => React.ReactNode[];

export type RowEditableConfig<DataType> = {
  /** @name 控制可编辑表格的 From的设置 */
  formProps?: Omit<
    FormProps<DataType> & {
      formRef?: React.Ref<FormInstance | undefined>;
      onInit?: (values: DataType, form: FormInstance) => void;
    },
    'onFinish'
  >;
  /** @name 控制可编辑表格的 form */
  form?: FormInstance;
  /**
   * @type single | multiple
   * @name 编辑的类型，支持单选和多选
   */
  type?: RowEditableType;
  /** @name 正在编辑的列 */
  editableKeys?: React.Key[];
  /** 正在编辑的列修改的时候 */
  onChange?: (
    editableKeys: React.Key[],
    editableRows: DataType[] | DataType,
  ) => void;
  /** 正在编辑的列修改的时候 */
  onValuesChange?: (record: DataType, dataSource: DataType[]) => void;
  /** @name 自定义编辑的操作 */
  actionRender?: ActionRenderFunction<DataType>;
  /** 行保存的时候 */
  onSave?: (
    /** 行 id，一般是唯一id */
    key: RecordKey,
    /** 当前修改的行的值，只有 form 在内的会被设置 */
    record: DataType & { index?: number },
    /** 原始值，可以用于判断是否修改 */
    originRow: DataType & { index?: number },
    /** 新建一行的配置，一般无用 */
    newLineConfig?: NewLineConfig<DataType>,
  ) => Promise<any | void>;

  /** 行保存的时候 */
  onCancel?: (
    /** 行 id，一般是唯一id */
    key: RecordKey,
    /** 当前修改的行的值，只有 form 在内的会被设置 */
    record: DataType & { index?: number },
    /** 原始值，可以用于判断是否修改 */
    originRow: DataType & { index?: number },
    /** 新建一行的配置，一般无用 */
    newLineConfig?: NewLineConfig<DataType>,
  ) => Promise<any | void>;
  /** 行删除的时候 */
  onDelete?: (
    key: RecordKey,
    row: DataType & { index?: number },
  ) => Promise<any | void>;
  /** 删除行时的确认消息 */
  deletePopconfirmMessage?: React.ReactNode;
  /** 只能编辑一行的的提示 */
  onlyOneLineEditorAlertMessage?: React.ReactNode;
  /** 同时只能新增一行的提示 */
  onlyAddOneLineAlertMessage?: React.ReactNode;
  /** Table 上设置的name，用于拼接name来获取数据 */
  tableName?: NamePath;
  /** 保存一行的文字 */
  saveText?: React.ReactNode;
  /** 取消编辑一行的文字 */
  cancelText?: React.ReactNode;
  /** 删除一行的文字 */
  deleteText?: React.ReactNode;
};
export type ActionTypeText<T> = {
  deleteText?: React.ReactNode;
  cancelText?: React.ReactNode;
  saveText?: React.ReactNode;
  editorType?: 'Array' | 'Map';
  addEditRecord?: (row: T, options?: AddLineOptions) => boolean;
};

export type ActionRenderConfig<T, LineConfig = NewLineConfig<T>> = {
  editableKeys?: RowEditableConfig<T>['editableKeys'];
  recordKey: RecordKey;
  index?: number;
  cancelEditable: (key: RecordKey) => void;
  onSave: RowEditableConfig<T>['onSave'];
  onCancel: RowEditableConfig<T>['onCancel'];
  onDelete?: RowEditableConfig<T>['onDelete'];
  deletePopconfirmMessage: RowEditableConfig<T>['deletePopconfirmMessage'];
  setEditableRowKeys: (value: React.Key[]) => void;
  newLineConfig?: LineConfig;
  tableName?: NamePath;

  children?: React.ReactNode;
} & ActionTypeText<T>;

/**
 * 使用map 来删除数据，性能一般 但是准确率比较高
 *
 * @param keyProps
 * @param action
 */
export function editableRowByKey<RecordType>(
  keyProps: {
    data: RecordType[];
    childrenColumnName: string;
    getRowKey: GetRowKey<RecordType>;
    key: RecordKey;
    row: RecordType;
  },
  action: 'update' | 'top' | 'delete',
) {
  const { getRowKey, row, data, childrenColumnName = 'children' } = keyProps;
  const key = recordKeyToString(keyProps.key)?.toString();

  const kvMap = new Map<string, RecordType & { parentKey?: React.Key }>();

  /**
   * 打平这个数组
   *
   * @param records
   * @param parentKey
   */
  function dig(
    records: RecordType[],
    map_row_parentKey?: React.Key,
    map_row_index?: number,
  ) {
    records.forEach((record, index) => {
      const eachIndex = (map_row_index || 0) * 10 + index;
      const recordKey = getRowKey(record, eachIndex).toString();
      // children 取在前面方便拼的时候按照反顺序放回去
      if (
        record &&
        typeof record === 'object' &&
        childrenColumnName in record
      ) {
        dig(record[childrenColumnName] || [], recordKey, eachIndex);
      }
      const newRecord = {
        ...record,
        map_row_key: recordKey,
        children: undefined,
        map_row_parentKey,
      };
      delete newRecord.children;
      if (!map_row_parentKey) {
        delete newRecord.map_row_parentKey;
      }
      kvMap.set(recordKey, newRecord);
    });
  }

  if (action === 'top') {
    kvMap.set(key, {
      ...kvMap.get(key),
      ...row,
    });
  }

  dig(data);

  if (action === 'update') {
    kvMap.set(key, {
      ...kvMap.get(key),
      ...row,
    });
  }

  if (action === 'delete') {
    kvMap.delete(key);
  }

  const fill = (
    map: Map<
      string,
      RecordType & { map_row_parentKey?: string; map_row_key?: string }
    >,
  ) => {
    const kvArrayMap = new Map<string, RecordType[]>();
    const kvSource: RecordType[] = [];
    const fillNewRecord = (fillChildren: boolean = false) => {
      map.forEach((value) => {
        if (value.map_row_parentKey && !value.map_row_key) {
          const { map_row_parentKey, ...rest } = value;
          if (!kvArrayMap.has(map_row_parentKey)) {
            kvArrayMap.set(map_row_parentKey, []);
          }
          if (fillChildren) {
            kvArrayMap
              .get(map_row_parentKey)
              ?.push(rest as unknown as RecordType);
          }
        }
      });
    };

    fillNewRecord(action === 'top');

    map.forEach((value) => {
      if (value.map_row_parentKey && value.map_row_key) {
        const { map_row_parentKey, map_row_key, ...rest } = value;
        if (kvArrayMap.has(map_row_key)) {
          rest[childrenColumnName] = kvArrayMap.get(map_row_key);
        }
        if (!kvArrayMap.has(map_row_parentKey)) {
          kvArrayMap.set(map_row_parentKey, []);
        }
        kvArrayMap.get(map_row_parentKey)?.push(rest as unknown as RecordType);
      }
    });

    fillNewRecord(action === 'update');

    map.forEach((value) => {
      if (!value.map_row_parentKey) {
        const { map_row_key, ...rest } = value;
        if (map_row_key && kvArrayMap.has(map_row_key)) {
          const item = {
            ...rest,
            [childrenColumnName]: kvArrayMap.get(map_row_key),
          };
          kvSource.push(item as RecordType);
          return;
        }
        kvSource.push(rest as RecordType);
      }
    });
    return kvSource;
  };
  return fill(kvMap);
}

/**
 * 保存按钮的dom
 *
 * @param ActionRenderConfig
 */
export function SaveEditableAction<T>(
  {
    recordKey,
    onSave,
    row,
    children,
    newLineConfig,
    editorType,
    tableName,
  }: ActionRenderConfig<T> & { row: any; children: any },
  ref: React.Ref<SaveEditableActionRef<T>>,
) {
  const context = useContext(ProFormContext);
  const form = Form.useFormInstance();
  const [loading, setLoading] = useMountMergeState<boolean>(false);
  const save = useRefFunction(async () => {
    try {
      const isMapEditor = editorType === 'Map';
      // 为了兼容类型为 array 的 dataIndex,当 recordKey 是一个数组时，用于获取表单值的 key 只取第一项，
      // 从表单中获取回来之后，再根据 namepath 获取具体的某个字段并设置
      const namePath = [
        tableName,
        Array.isArray(recordKey) ? recordKey[0] : recordKey,
      ]
        .map((key) => key?.toString())
        .flat(1)
        .filter(Boolean) as string[];
      setLoading(true);
      await form.validateFields(namePath, {
        // @ts-expect-error
        recursive: true,
      });

      const fields =
        context.getFieldFormatValue?.(namePath) || form.getFieldValue(namePath);
      // 处理 dataIndex 为数组的情况
      if (Array.isArray(recordKey) && recordKey.length > 1) {
        // 获取 namepath
        const [, ...recordKeyPath] = recordKey;
        // 将目标值获取出来并设置到 fields 当中
        const curValue = get(fields, recordKeyPath as string[]);
        set(fields, recordKeyPath, curValue);
      }
      const data = isMapEditor ? set({}, namePath, fields, true) : fields;

      // 获取数据并保存
      const res = await onSave?.(
        recordKey,
        // 如果是 map 模式，fields 就是一个值，所以需要set 到对象中
        // 数据模式 fields 是一个对象，所以不需要
        merge({}, row, data),
        row,
        newLineConfig,
      );
      setLoading(false);
      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setLoading(false);
      throw error;
    }
  });

  // 保存数据
  useImperativeHandle(
    ref,
    () => ({
      save,
    }),
    [save],
  );

  return (
    <a
      key="save"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
          await save();
        } catch {}
      }}
    >
      {loading ? (
        <LoadingOutlined
          style={{
            marginInlineEnd: 8,
          }}
        />
      ) : null}
      {children || '保存'}
    </a>
  );
}
export type SaveEditableActionRef<T = any> = {
  /**
   * 直接触发保存动作
   *
   * @throws 如果校验失败，会抛出异常
   *  */
  save: () =>
    | ReturnType<NonNullable<RowEditableConfig<T>['onSave']>>
    | Promise<void>;
};

/**
 * 删除按钮 dom
 *
 * @param ActionRenderConfig
 */
export const DeleteEditableAction: React.FC<
  ActionRenderConfig<any> & { row: any }
> = ({ recordKey, onDelete, row, children, deletePopconfirmMessage }) => {
  const [loading, setLoading] = useMountMergeState<boolean>(() => false);

  const onConfirm = useRefFunction(async () => {
    try {
      setLoading(true);
      const res = await onDelete?.(recordKey, row);
      setLoading(false);

      return res;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      setLoading(false);

      return null;
    }
  });
  return children !== false ? (
    <Popconfirm
      key="delete"
      title={deletePopconfirmMessage}
      onConfirm={() => onConfirm()}
    >
      <a>
        {loading ? (
          <LoadingOutlined
            style={{
              marginInlineEnd: 8,
            }}
          />
        ) : null}
        {children || '删除'}
      </a>
    </Popconfirm>
  ) : null;
};

const CancelEditableAction: React.FC<ActionRenderConfig<any> & { row: any }> = (
  props,
) => {
  const {
    recordKey,
    tableName,
    newLineConfig,
    editorType,
    onCancel,
    cancelEditable,
    row,
    cancelText,
  } = props;
  const context = useContext(ProFormContext);
  const form = Form.useFormInstance();
  return (
    <a
      key="cancel"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const isMapEditor = editorType === 'Map';
        const namePath = [tableName, recordKey]
          .flat(1)
          .filter(Boolean) as string[];
        const fields =
          context.getFieldFormatValue?.(namePath) ||
          form.getFieldValue(namePath);
        const record = isMapEditor ? set({}, namePath, fields) : fields;
        const res = await onCancel?.(recordKey, record, row, newLineConfig);
        await cancelEditable(recordKey);
        /** 重置为默认值，不然编辑的行会丢掉 */
        form.setFieldsValue({
          [recordKey as React.Key]: isMapEditor ? get(row, namePath) : row,
        });
        return res;
      }}
    >
      {cancelText || '取消'}
    </a>
  );
};

export function defaultActionRender<T>(
  row: T,
  config: ActionRenderConfig<T, NewLineConfig<T>>,
) {
  const { recordKey, newLineConfig, saveText, deleteText } = config;
  const SaveEditableActionRef = forwardRef(
    SaveEditableAction as typeof SaveEditableAction<T>,
  );
  const saveRef = createRef<SaveEditableActionRef<T>>();

  return {
    save: (
      <SaveEditableActionRef
        key={'save' + recordKey}
        {...config}
        row={row}
        ref={saveRef}
      >
        {saveText}
      </SaveEditableActionRef>
    ),
    saveRef,
    delete:
      newLineConfig?.options.recordKey !== recordKey ? (
        <DeleteEditableAction key={'delete' + recordKey} {...config} row={row}>
          {deleteText}
        </DeleteEditableAction>
      ) : undefined,
    cancel: (
      <CancelEditableAction key={'cancel' + recordKey} {...config} row={row} />
    ),
  };
}

/**
 * 一个方便的hooks 用于维护编辑的状态
 *
 * @param props
 */
export function useEditableArray<RecordType>(
  props: RowEditableConfig<RecordType> & {
    getRowKey: GetRowKey<RecordType>;
    dataSource: RecordType[];
    onValuesChange?: (record: RecordType, dataSource: RecordType[]) => void;
    childrenColumnName: string | undefined;
    setDataSource: (dataSource: RecordType[]) => void;
  },
) {
  const [newLineRecordCache, setNewLineRecordCache] = useState<
    NewLineConfig<RecordType> | undefined
  >(undefined);

  const resetMapRef = () => {
    const map = new Map<React.Key, React.Key>();
    //存在children时会覆盖Map的key,导致使用数组索引查找key错误
    const loopGetKey = (dataSource: RecordType[], parentKey?: string) => {
      dataSource?.forEach((record, index) => {
        const key =
          parentKey === undefined || parentKey === null
            ? index.toString()
            : parentKey + '_' + index.toString();
        map.set(key, recordKeyToString(props.getRowKey(record, -1)));
        map.set(
          recordKeyToString(props.getRowKey(record, -1))?.toString(),
          key,
        );
        if (props.childrenColumnName && record[props.childrenColumnName]) {
          loopGetKey(record[props.childrenColumnName], key);
        }
      });
    };
    loopGetKey(props.dataSource);
    return map;
  };
  const initDataSourceKeyIndexMap = useMemo(() => resetMapRef(), []);

  const dataSourceKeyIndexMapRef = useRef<Map<React.Key, React.Key>>(
    initDataSourceKeyIndexMap,
  );
  const newLineRecordRef = useRef<NewLineConfig<RecordType> | undefined>(
    undefined,
  );

  useDeepCompareEffectDebounce(() => {
    dataSourceKeyIndexMapRef.current = resetMapRef();
  }, [props.dataSource]);

  // 这里这么做是为了存上次的状态，不然每次存一下再拿
  newLineRecordRef.current = newLineRecordCache;

  const editableType = props.type || 'single';
  const [getRecordByKey] = useLazyKVMap(
    props.dataSource,
    'children',
    props.getRowKey,
  );

  const [editableKeys, setEditableRowKeys] = useMergedState<
    React.Key[] | undefined
  >([], {
    value: props.editableKeys,
    onChange: props.onChange
      ? (keys) => {
          props?.onChange?.(
            // 计算编辑的key
            keys?.filter((key) => key !== undefined) ?? [],
            // 计算编辑的行
            keys
              ?.map((key) => getRecordByKey(key))
              .filter((key) => key !== undefined) ?? [],
          );
        }
      : undefined,
  });

  /** 一个用来标志的set 提供了方便的 api 来去重什么的 */
  const editableKeysSet = useMemo(() => {
    const keys =
      editableType === 'single' ? editableKeys?.slice(0, 1) : editableKeys;
    return new Set(keys);
  }, [(editableKeys || []).join(','), editableType]);

  const editableKeysRef = usePrevious(editableKeys);

  /** 这行是不是编辑状态 */
  const isEditable = useRefFunction((row: RecordType & { index: number }) => {
    // 为了兼容一下name 模式的 indexKey，所以需要判断两次，一次是index，一次是没有 index 的
    const recordKeyOrIndex = props.getRowKey(row, row.index)?.toString?.();
    // 这里是不设置 index 的地方
    const recordKey = props.getRowKey(row, -1)?.toString?.();

    // 都转化为了字符串，不然 number 和 string
    const stringEditableKeys = editableKeys?.map((key) => key?.toString());
    const stringEditableKeysRef =
      editableKeysRef?.map((key) => key?.toString()) || [];

    const preIsEditable =
      (props.tableName && !!stringEditableKeysRef?.includes(recordKey)) ||
      !!stringEditableKeysRef?.includes(recordKeyOrIndex);

    return {
      recordKey,
      isEditable:
        (props.tableName && stringEditableKeys?.includes(recordKey)) ||
        stringEditableKeys?.includes(recordKeyOrIndex),
      preIsEditable,
    };
  });

  /**
   * 进入编辑状态
   *
   * @param recordKey
   */
  const startEditable = useRefFunction((recordKey: React.Key) => {
    // 如果是单行的话，不允许多行编辑
    if (
      editableKeysSet.size > 0 &&
      editableType === 'single' &&
      props.onlyOneLineEditorAlertMessage !== false
    ) {
      warning(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行');
      return false;
    }
    editableKeysSet.add(recordKey);
    setEditableRowKeys(Array.from(editableKeysSet));
    return true;
  });

  /**
   * 退出编辑状态
   *
   * @param recordKey
   */
  const cancelEditable = useRefFunction(
    async (recordKey: RecordKey, needReTry?: boolean) => {
      const relayKey = recordKeyToString(recordKey).toString();

      const key = dataSourceKeyIndexMapRef.current.get(relayKey);

      /** 如果没找到key，转化一下再去找 */
      if (
        !editableKeysSet.has(relayKey) &&
        key &&
        (needReTry ?? true) &&
        props.tableName
      ) {
        cancelEditable(key, false);
        return;
      }
      /** 如果这个是 new Line 直接删除 */
      if (
        newLineRecordCache &&
        newLineRecordCache.options.recordKey === recordKey
      ) {
        setNewLineRecordCache(undefined);
      }
      editableKeysSet.delete(relayKey);
      editableKeysSet.delete(recordKeyToString(recordKey));
      setEditableRowKeys(Array.from(editableKeysSet));
      return true;
    },
  );

  const propsOnValuesChange = useDebounceFn(async (...rest: any[]) => {
    //@ts-ignore
    props.onValuesChange?.(...rest);
  }, 64);

  const onValuesChange = useRefFunction(
    (value: RecordType, values: RecordType) => {
      if (!props.onValuesChange) {
        return;
      }
      let { dataSource } = props;

      // 这里是把正在编辑中的所有表单数据都修改掉
      // 不然会用 props 里面的 dataSource，数据只有正在编辑中的
      // Object.keys(get(values, [props.tableName || ''].flat(1)) || values).forEach((recordKey) => {
      editableKeys?.forEach((eachRecordKey) => {
        if (newLineRecordCache?.options.recordKey === eachRecordKey) return;
        const recordKey = eachRecordKey.toString();
        // 如果数据在这个 form 中没有展示，也不显示
        const editRow = get(
          values,
          [props.tableName || '', recordKey]
            .flat(1)
            .filter((key) => key || key === 0),
        );

        if (!editRow) return;
        dataSource = editableRowByKey(
          {
            data: dataSource,
            getRowKey: props.getRowKey,
            row: editRow,
            key: recordKey,
            childrenColumnName: props.childrenColumnName || 'children',
          },
          'update',
        );
      });

      const relayValue = value;
      const recordKey = Object.keys(relayValue || {})
        .pop()
        ?.toString() as string;

      //从form 和 cache 中取得数据
      const newLineRecordData = {
        ...newLineRecordCache?.defaultValue,
        ...get(
          values,
          [props.tableName || '', recordKey.toString()]
            .flat(1)
            .filter((key) => key || key === 0),
        ),
      };

      /** 如果已经在 dataSource 中存在了，直接 find */
      const editRow = dataSourceKeyIndexMapRef.current.has(
        recordKeyToString(recordKey),
      )
        ? dataSource.find((item, index) => {
            const key = props.getRowKey(item, index)?.toString();
            return key === recordKey;
          })
        : newLineRecordData;

      propsOnValuesChange.run(editRow || newLineRecordData, dataSource);
    },
  );

  const saveRefsMap = useRef<
    Map<React.Key, React.RefObject<SaveEditableActionRef>>
  >(new Map<React.Key, React.RefObject<SaveEditableActionRef>>());
  useEffect(() => {
    // 确保只保留编辑状态的，其它的都删除掉
    saveRefsMap.current.forEach((ref, key) => {
      if (!editableKeysSet.has(key)) {
        saveRefsMap.current.delete(key);
      }
    });
  }, [saveRefsMap, editableKeysSet]);
  /**
   * 保存编辑行
   *
   * @param recordKey
   * @param needReTry
   */
  const saveEditable = useRefFunction(
    async (recordKey: RecordKey, needReTry?: boolean): Promise<boolean> => {
      const relayKey = recordKeyToString(recordKey);
      const key = dataSourceKeyIndexMapRef.current.get(recordKey.toString());

      /** 如果没找到key，转化一下再去找 */
      if (
        !editableKeysSet.has(relayKey) &&
        key &&
        (needReTry ?? true) &&
        props.tableName
      ) {
        return await saveEditable(key, false);
      }

      const saveRef =
        saveRefsMap.current.get(relayKey) ||
        saveRefsMap.current.get(relayKey.toString());
      try {
        await saveRef?.current?.save();
      } catch {
        return false;
      }

      editableKeysSet.delete(relayKey);
      editableKeysSet.delete(relayKey.toString());
      setEditableRowKeys(Array.from(editableKeysSet));
      return true;
    },
  );

  /**
   * 同时只能支持一行,取消之后数据消息，不会触发 dataSource
   *
   * @param row
   * @param options
   * @name 增加新的行
   */
  const addEditRecord = useRefFunction(
    (row: RecordType, options?: AddLineOptions) => {
      if (
        options?.parentKey &&
        !dataSourceKeyIndexMapRef.current.has(
          recordKeyToString(options?.parentKey).toString(),
        )
      ) {
        console.warn("can't find record by key", options?.parentKey);
        return false;
      }
      // 暂时不支持多行新增
      if (
        newLineRecordRef.current &&
        props.onlyAddOneLineAlertMessage !== false
      ) {
        warning(props.onlyAddOneLineAlertMessage || '只能新增一行');
        return false;
      }
      // 如果是单行的话，不允许多行编辑
      if (
        editableKeysSet.size > 0 &&
        editableType === 'single' &&
        props.onlyOneLineEditorAlertMessage !== false
      ) {
        warning(props.onlyOneLineEditorAlertMessage || '只能同时编辑一行');
        return false;
      }
      // 防止多次渲染
      const recordKey = props.getRowKey(row, -1);

      if (!recordKey && recordKey !== 0) {
        noteOnce(
          !!recordKey,
          '请设置 recordCreatorProps.record 并返回一个唯一的key  \n  https://procomponents.ant.design/components/editable-table#editable-%E6%96%B0%E5%BB%BA%E8%A1%8C',
        );
        throw new Error('请设置 recordCreatorProps.record 并返回一个唯一的key');
      }
      editableKeysSet.add(recordKey);

      setEditableRowKeys(Array.from(editableKeysSet));

      // 如果是dataSource 新增模式的话，取消再开始编辑，
      // 这样就可以把新增到 dataSource的数据进入编辑模式了
      // [a,b,cache] => [a,b,c]
      if (options?.newRecordType === 'dataSource' || props.tableName) {
        const actionProps = {
          data: props.dataSource,
          getRowKey: props.getRowKey,
          row: {
            ...row,
            map_row_parentKey: options?.parentKey
              ? recordKeyToString(options?.parentKey)?.toString()
              : undefined,
          },
          key: recordKey,
          childrenColumnName: props.childrenColumnName || 'children',
        };
        props.setDataSource(
          editableRowByKey(
            actionProps,
            options?.position === 'top' ? 'top' : 'update',
          ),
        );
      } else {
        setNewLineRecordCache({
          defaultValue: row,
          options: {
            ...options,
            recordKey,
          },
        });
      }
      return true;
    },
  );

  // Internationalization
  const intl = useIntl();
  const saveText =
    props?.saveText || intl.getMessage('editableTable.action.save', '保存');
  const deleteText =
    props?.deleteText || intl.getMessage('editableTable.action.delete', '删除');
  const cancelText =
    props?.cancelText || intl.getMessage('editableTable.action.cancel', '取消');

  const actionSaveRef = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & {
        index?: number;
      },
      originRow: RecordType & {
        index?: number;
      },
      newLine?: NewLineConfig<RecordType>,
    ) => {
      const res = await props?.onSave?.(recordKey, editRow, originRow, newLine);
      // 保存时解除编辑模式,这个要提前一下不然数据会被清空
      await cancelEditable(recordKey);

      const { options } = newLine || newLineRecordRef.current || {};
      if (!options?.parentKey && options?.recordKey === recordKey) {
        if (options?.position === 'top') {
          props.setDataSource([editRow, ...props.dataSource]);
        } else {
          props.setDataSource([...props.dataSource, editRow]);
        }
        return res;
      }
      const actionProps = {
        data: props.dataSource,
        getRowKey: props.getRowKey,
        row: options
          ? {
              ...editRow,
              map_row_parentKey: recordKeyToString(
                options?.parentKey ?? '',
              )?.toString(),
            }
          : editRow,
        key: recordKey,
        childrenColumnName: props.childrenColumnName || 'children',
      };
      props.setDataSource(
        editableRowByKey(
          actionProps,
          options?.position === 'top' ? 'top' : 'update',
        ),
      );
      await cancelEditable(recordKey);
      return res;
    },
  );

  const actionDeleteRef = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & {
        index?: number;
      },
    ) => {
      const actionProps = {
        data: props.dataSource,
        getRowKey: props.getRowKey,
        row: editRow,
        key: recordKey,
        childrenColumnName: props.childrenColumnName || 'children',
      };
      const res = await props?.onDelete?.(recordKey, editRow);
      // 不传递 false时，重新form.setFieldsValue同一份静态数据，会导致该行始终处于不可编辑状态
      await cancelEditable(recordKey, false);
      props.setDataSource(editableRowByKey(actionProps, 'delete'));

      return res;
    },
  );

  const actionCancelRef = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & {
        index?: number;
      },
      originRow: RecordType & { index?: number },
      newLine?: NewLineConfig<RecordType>,
    ) => {
      const res = await props?.onCancel?.(
        recordKey,
        editRow,
        originRow,
        newLine,
      );
      return res;
    },
  );

  const actionRender = (row: RecordType & { index: number }) => {
    const key = props.getRowKey(row, row.index);
    const config: ActionRenderConfig<any, NewLineConfig<any>> = {
      saveText,
      cancelText,
      deleteText,
      addEditRecord,
      recordKey: key,
      cancelEditable,
      index: row.index,
      tableName: props.tableName,
      newLineConfig: newLineRecordCache,
      onCancel: actionCancelRef,
      onDelete: actionDeleteRef,
      onSave: actionSaveRef,
      editableKeys,
      setEditableRowKeys,
      deletePopconfirmMessage:
        props.deletePopconfirmMessage ||
        `${intl.getMessage('deleteThisLine', '删除此行')}?`,
    };

    const renderResult = defaultActionRender<RecordType>(row, config);
    // 缓存一下saveRef
    if (props.tableName) {
      saveRefsMap.current.set(
        dataSourceKeyIndexMapRef.current.get(recordKeyToString(key)) ||
          recordKeyToString(key),
        renderResult.saveRef,
      );
    } else {
      saveRefsMap.current.set(recordKeyToString(key), renderResult.saveRef);
    }
    if (props.actionRender)
      return props.actionRender(row, config, {
        save: renderResult.save,
        delete: renderResult.delete,
        cancel: renderResult.cancel,
      });
    return [renderResult.save, renderResult.delete, renderResult.cancel];
  };

  return {
    editableKeys,
    setEditableRowKeys,
    isEditable,
    actionRender,
    startEditable,
    cancelEditable,
    addEditRecord,
    saveEditable,
    newLineRecord: newLineRecordCache,
    preEditableKeys: editableKeysRef,
    onValuesChange,
  };
}

export type UseEditableType = typeof useEditableArray;

export type UseEditableUtilType = ReturnType<UseEditableType>;
