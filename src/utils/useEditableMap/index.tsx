import { get, useControlledState } from '@rc-component/util';
import { message } from 'antd';
import set from 'lodash-es/set';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRefFunction } from '..';
import { useIntl } from '../../provider';
import type {
  ActionRenderConfig,
  ActionTypeText,
  NewLineConfig,
  RecordKey,
  RowEditableConfig,
} from '../useEditableArray';
import { defaultActionRender, recordKeyToString } from '../useEditableArray';

/**
 * 把 RecordKey 规范成统一的 string 形式 key（用于 Map 索引 / Set 成员判断）。
 * RecordKey = React.Key | React.Key[]，统一转 string 避免 number/string 不一致。
 */
const normalizeKeyToString = (recordKey: RecordKey): string =>
  String(recordKeyToString(recordKey));

/**
 * 把 RecordKey 转成 lodash set/get 用的路径数组，统一为 string 段。
 * 例如：'name' → ['name']，['address','city'] → ['address','city']，123 → ['123']
 */
const recordKeyToPath = (recordKey: RecordKey): (string | number)[] => {
  return Array.isArray(recordKey)
    ? recordKey.map((segment) => String(segment))
    : [String(recordKey)];
};

/**
 * 显示警告信息（仅在 single 模式拦截重复编辑时调用）。
 * NOTE: 使用 antd `message` 静态方法在 antd 5 下无法消费 ConfigProvider 的主题，
 *       但替换为 `App.useApp()` 需要业务方在外层包裹 `<App />`，会有破坏性。
 *       这里保留静态方法兼容历史调用，建议消费方自行包裹 `<App />` 以获得正确主题。
 */
const warning = (messageStr: React.ReactNode) => {
  message.warning(messageStr);
};

/**
 * 按 recordKey 路径深度合并到 data 上：
 * - 顶层 key（如 'name'）：等价于 `{ ...data, ...{ name: row.name } }`，但只取该路径
 * - 嵌套数组 key（如 ['address','city']）：仅更新 data.address.city，不会把 data.address 整个替换掉
 *   这避免了之前 `{ ...data, ...row }` 顶层合并导致兄弟字段（如 data.address.zipcode）被丢失的问题。
 */
function editableRowByKey<RecordType extends Record<string, any>>({
  data,
  row,
  key,
}: {
  data: RecordType;
  row: RecordType;
  key: RecordKey;
}): RecordType {
  const path = recordKeyToPath(key);
  const value = get(row, path);
  // 当 row 路径上没有目标值时（典型场景：受控外部 form 直接 setFieldsValue），
  // 退回到顶层合并语义，保持向后兼容。
  if (value === undefined) {
    return { ...data, ...row };
  }
  // lodash set 会原地修改对象，先做浅拷贝避免污染调用方的引用。
  return set({ ...data }, path, value);
}

export type AddLineOptions = {
  position?: 'top' | 'bottom';
  recordKey?: React.Key;
};

/**
 * 单条记录场景下的"行内编辑"状态管理 hook（与 useEditableArray 平行设计，
 * useEditableArray 服务于数组场景如 ProTable，本 hook 服务于 ProDescriptions 等单记录场景）。
 *
 * 设计要点：
 * 1. `type='single'`（默认）下，已有任意字段处于编辑态时，再次发起 startEditable 会被拒绝并弹 toast，
 *    用户必须先 cancel/save 当前编辑行才能编辑别的字段。这是产品刻意设计（受测试 `📝 单行模式下应该阻止同时编辑多个字段` 锁定），
 *    与某些同类组件"切换式"行为不同；如需切换，需显式传 `type='multiple'` 并自行约束最多一行。
 * 2. 多行模式（`type='multiple'`）支持任意多个字段同时编辑，每个字段进入编辑态前的快照按 key 存到 `preEditRowRefs` Map 中。
 *
 * @param props
 */
export function useEditableMap<
  RecordType extends Record<string, any> = Record<string, any>,
>(
  props: RowEditableConfig<RecordType> & {
    dataSource: RecordType;
    childrenColumnName?: string;
    setDataSource: (dataSource: RecordType) => void;
  },
) {
  /**
   * 多行编辑场景下，按 recordKey 缓存每一行进入编辑前的快照（允许 null 表示新建行）。
   * NOTE: 旧版同时维护了 `preEditRowRef`（单引用），但在 multiple 模式下会被新行覆盖，
   *       导致取消时还原成别人的数据，已删除。actionRender 透传 `preEditRowRef` 时按当前 key
   *       从 Map 取最新快照临时构造一个 ref，保证 defaultActionRender 拿到的是正确的快照。
   */
  const preEditRowRefs = useRef<Map<string, RecordType | null>>(new Map());

  // 用 ?? 而非 ||，更准确表达"undefined 时取默认"的语义（type 不会传 falsy 但合法的值）
  const editableType = props.type ?? 'single';

  // Internationalization
  const intl = useIntl();

  const [editableKeys, setEditableRowKeysInner] = useControlledState<
    React.Key[]
  >([], props.editableKeys);

  /**
   * 影子 ref，存放当前最新的 editableKeys。
   * NOTE: 配合 useRefFunction 使用——后者保证函数引用稳定但闭包永远是渲染时最新的，
   *       但我们需要"调用时最新"（例如 onSave 内连续调用 cancelEditable 时 React 还没 commit），
   *       所以用 ref 保留同步影子。
   */
  const editableKeysRef = useRef<React.Key[]>(editableKeys);
  useEffect(() => {
    editableKeysRef.current = editableKeys;
  }, [editableKeys]);

  /**
   * 把 onChange/dataSource 锁进 ref，避免每次 prop 变化都让 setEditableRowKeys 重建引用。
   * 同时修正 onChange 第二参数语义：旧版直接传 props.dataSource（整条记录），
   * 现在按 next keys 取出真正在编辑的字段值数组（与 useEditableArray 行为对齐）。
   */
  const triggerOnChange = useRefFunction((nextKeys: React.Key[]) => {
    if (!props.onChange) return;
    const editingRows = nextKeys.map((key) =>
      get(props.dataSource as any, [String(key)]),
    ) as RecordType[];
    props.onChange(nextKeys, editingRows);
  });

  const setEditableRowKeys = useCallback(
    (updater: React.Key[] | ((prev: React.Key[]) => React.Key[])) => {
      setEditableRowKeysInner((prev) => {
        let next =
          typeof updater === 'function'
            ? (updater as (p: React.Key[]) => React.Key[])(prev)
            : updater;
        // single 模式下统一在入口截断，保证 state 与 editableKeysSet 一致。
        // 旧版只在 editableKeysSet 里 slice(0,1)，导致 state 里残留多余 key 但 isEditable 看不到。
        if (editableType === 'single' && next.length > 1) {
          next = next.slice(0, 1);
        }
        triggerOnChange(next);
        return next;
      });
    },
    [setEditableRowKeysInner, triggerOnChange, editableType],
  );

  /** 一个用来标志的set 提供了方便的 api 来去重什么的 */
  const editableKeysSet = useMemo(() => {
    return new Set((editableKeys || []).map((key) => String(key)));
  }, [editableKeys]);

  /** 这行是不是编辑状态。useRefFunction 保证引用稳定且闭包永远最新。 */
  const isEditable = useRefFunction((recordKey: RecordKey): boolean => {
    return editableKeysSet.has(normalizeKeyToString(recordKey));
  });

  /**
   * 验证是否可以开始编辑（仅 single 模式下生效）。
   * 用 editableKeysRef 读最新值，避免连续调用时拿到陈旧快照。
   */
  const validateCanStartEdit = useRefFunction((): boolean => {
    const currentKeys = editableKeysRef.current;
    if (editableType === 'single' && currentKeys && currentKeys.length > 0) {
      warning(
        props.onlyOneLineEditorAlertMessage ||
          intl.getMessage(
            'editableTable.onlyOneLineEditor',
            '只能同时编辑一行',
          ),
      );
      return false;
    }
    return true;
  });

  /**
   * 进入编辑状态
   *
   * @param recordKey
   * @param recordValue 显式传入的"编辑前快照"，未传则从 dataSource 按 key 路径取
   */
  const startEditable = useRefFunction(
    (recordKey: RecordKey, recordValue?: any): boolean => {
      if (!validateCanStartEdit()) {
        return false;
      }

      const keyStr = normalizeKeyToString(recordKey);

      // 已经在编辑列表中，幂等返回成功
      if (isEditable(recordKey)) {
        return true;
      }

      // 保存编辑前的数据到 Map（按 recordKey 索引，多行场景互不干扰）
      const snapshot =
        recordValue ?? get(props.dataSource, recordKeyToPath(recordKey)) ?? null;
      preEditRowRefs.current.set(keyStr, snapshot);

      const currentKeys = editableKeysRef.current;
      const newKeys =
        editableType === 'single'
          ? [keyStr]
          : [...(currentKeys || []), keyStr];

      setEditableRowKeys(newKeys);
      return true;
    },
  );

  /**
   * 退出编辑状态
   *
   * @param recordKey
   */
  const cancelEditable = useRefFunction((recordKey: RecordKey): boolean => {
    const keyStr = normalizeKeyToString(recordKey);

    if (!isEditable(recordKey)) {
      return true;
    }

    // 用 editableKeysRef 读最新值，避免快速连续调用时基于陈旧 editableKeys 计算
    const newKeys = (editableKeysRef.current || []).filter(
      (key) => String(key) !== keyStr,
    );

    setEditableRowKeys(newKeys);
    return true;
  });

  /**
   * 取消编辑的回调（透传给 props.onCancel，后者返回 false 视为失败、其他视为成功）。
   * NOTE: "false 即失败" 是与 RowEditableConfig 共用的隐式协议，类型上是 `Promise<any | void>`，
   *       这里在文档里显式说明便于消费方理解。
   */
  const onCancel = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & { index?: number },
      originRow: RecordType & { index?: number },
      newLine?: NewLineConfig<any>,
    ): Promise<boolean> => {
      const success = await props?.onCancel?.(
        recordKey,
        editRow,
        originRow,
        newLine,
      );
      return success !== false;
    },
  );

  /**
   * 保存编辑的回调（透传给 props.onSave，后者返回 false 视为失败、其他视为成功）。
   * 成功后：1) 退出编辑态 2) 清掉 preEditRowRefs Map 缓存 3) 按 recordKey 路径更新 dataSource。
   */
  const onSave = useRefFunction(
    async (
      recordKey: RecordKey,
      editRow: RecordType & { index?: number },
      originRow: RecordType & { index?: number },
    ): Promise<boolean> => {
      const success = await props?.onSave?.(recordKey, editRow, originRow);
      if (success === false) {
        return false;
      }

      // 先退出编辑状态
      await cancelEditable(recordKey);
      preEditRowRefs.current.delete(normalizeKeyToString(recordKey));

      // 按 key 路径深度合并到 dataSource，避免顶层合并把兄弟字段冲掉
      props.setDataSource(
        editableRowByKey({
          data: props.dataSource,
          row: editRow,
          key: recordKey,
        }),
      );
      return true;
    },
  );

  const saveText = intl.getMessage('editableTable.action.save', '保存');
  const deleteText = intl.getMessage('editableTable.action.delete', '删除');
  const cancelText = intl.getMessage('editableTable.action.cancel', '取消');
  // 提到外部，避免每次 actionRender 都重新拼模板字符串
  const deletePopconfirmMessage = `${intl.getMessage(
    'deleteThisLine',
    '删除此项',
  )}?`;

  /**
   * 渲染操作按钮。
   * useCallback 依赖只列真正会变的：editableKeys / dataSource / props.actionRender / 文案 token。
   * cancelEditable / onCancel / onSave 都是 useRefFunction 引用永远稳定，不必列。
   */
  const actionRender = useCallback(
    (key: RecordKey, config?: ActionTypeText<RecordType>) => {
      // 按当前 recordKey 从 Map 取真正的快照，构造一个临时 ref 透传给 defaultActionRender。
      // 这避免了旧版用全局单引用 preEditRowRef 在多行场景被覆盖的 bug。
      const snapshotRef: React.MutableRefObject<RecordType | null> = {
        current: preEditRowRefs.current.get(normalizeKeyToString(key)) ?? null,
      };

      const renderConfig: ActionRenderConfig<
        RecordType,
        NewLineConfig<RecordType>
      > = {
        recordKey: key,
        cancelEditable,
        onCancel,
        onSave,
        editableKeys,
        setEditableRowKeys,
        saveText,
        cancelText,
        preEditRowRef: snapshotRef,
        preEditRowRefs,
        deleteText,
        deletePopconfirmMessage,
        editorType: 'Map',
        ...config,
      };

      const renderResult = defaultActionRender(props.dataSource, renderConfig);
      if (props.actionRender) {
        return props.actionRender(props.dataSource, renderConfig, {
          save: renderResult.save,
          delete: renderResult.delete,
          cancel: renderResult.cancel,
        });
      }
      return [renderResult.save, renderResult.delete, renderResult.cancel];
    },
    [
      editableKeys,
      props.dataSource,
      props.actionRender,
      setEditableRowKeys,
      saveText,
      cancelText,
      deleteText,
      deletePopconfirmMessage,
      cancelEditable,
      onCancel,
      onSave,
    ],
  );

  return {
    editableKeys,
    setEditableRowKeys,
    isEditable,
    actionRender,
    startEditable,
    cancelEditable,
  };
}

export type UseEditableMapType = typeof useEditableMap;

export type UseEditableMapUtilType = ReturnType<UseEditableMapType>;
