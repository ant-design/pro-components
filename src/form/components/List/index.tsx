import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { warning } from '@rc-component/util';
import type { ColProps, FormInstance } from 'antd';
import { ConfigProvider, Form } from 'antd';
import type {
  FormListFieldData,
  FormListOperation,
  FormListProps,
} from 'antd/lib/form/FormList';
import type { NamePath } from 'antd/lib/form/interface';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useIntl } from '../../../provider';
import type { LabelTooltipType, SearchConvertKeyFn } from '../../../utils';
import { ProFormContext } from '../../../utils';
import FieldContext from '../../FieldContext';
import { useGridHelpers } from '../../helpers';
import type { ProFormGridConfig } from '../../typing';
import { ProFormListContainer } from './ListContainer';
import type {
  ChildrenItemFunction,
  FormListActionGuard,
  ProFromListCommonProps,
} from './ListItem';
import { useStyle } from './style';

const { noteOnce } = warning;

const FormListContext = React.createContext<
  | (FormListFieldData & {
      listName: NamePath;
    })
  | Record<string, any>
>({});

const ProFormListValueConverter: React.FC<{
  children: ReactNode;
  convertValue: SearchConvertKeyFn;
  form: FormInstance;
  name: NamePath;
}> = ({ children, convertValue, form, name }) => {
  const value = form.getFieldValue(name);
  const [, forceRender] = React.useReducer((count) => count + 1, 0);
  const convertedValueRef = useRef<unknown>();
  const convertValueTypeRef = useRef<{ source: string; target: string }>();
  const getValueType = (currentValue: unknown) => {
    if (currentValue === null) return 'null';
    if (Array.isArray(currentValue)) return 'array';
    return typeof currentValue;
  };
  const valueType = getValueType(value);
  const cachedTypes = convertValueTypeRef.current;
  const shouldReuseComponentValue =
    convertedValueRef.current === value ||
    (cachedTypes &&
      cachedTypes.source !== cachedTypes.target &&
      valueType === cachedTypes.target);
  const convertedValue =
    value === undefined || shouldReuseComponentValue
      ? value
      : convertValue(value, name, form.getFieldsValue(true));
  const shouldConvert =
    value !== undefined &&
    !shouldReuseComponentValue &&
    !Object.is(convertedValue, value);

  React.useLayoutEffect(() => {
    if (!shouldConvert) return;
    convertValueTypeRef.current = {
      source: valueType,
      target: getValueType(convertedValue),
    };
    convertedValueRef.current = convertedValue;
    form.setFieldValue(name, convertedValue);
    forceRender();
  }, [convertedValue, form, name, shouldConvert, valueType]);

  return shouldConvert ? null : children;
};

export type FormListActionType<T = any> = FormListOperation & {
  get: (index: number) => T | undefined;
  getList: () => T[] | undefined;
};

export type ProFormListProps<T> = Omit<FormListProps, 'children' | 'rules'> &
  ProFromListCommonProps & {
    /**
     * @name 列表的标签
     */
    label?: ReactNode;
    /**
     * @name 标题旁边的？号提示展示的信息
     *
     * @example 自定义提示信息
     * <ProForm.Group title="标题"  tooltip="自定义提示信息">
     *  @example 自定义Icon
     * <ProForm.Group title="标题"  tooltip={{icon:<Info/>,title:自定义提示信息}}>
     */
    tooltip?: LabelTooltipType;
    /** 将后端值转换为 Form.List 使用的数组值 */
    convertValue?: SearchConvertKeyFn;
    /**
     * @name 行操作的钩子配置
     *
     * @example 阻止删除 actionGuard={{beforeAddRow:()=> return false}}
     * @example 阻止新增 actionGuard={{beforeAddRow:()=> return false}}
     */
    actionGuard?: FormListActionGuard;
    children?: ReactNode | ChildrenItemFunction;

    /**
     * @name 在最后增加一个 dom
     *
     * @example 自定义新增按钮
     * fieldExtraRender={(fieldAction) => {<a onClick={()=>fieldAction.add({id:"xx"})}>新增</a>}}
     */
    fieldExtraRender?: (
      fieldAction: FormListOperation,
      meta: {
        errors?: React.ReactNode[];
        warnings?: React.ReactNode[];
      },
    ) => React.ReactNode;
    /**
     * @name 获取到 list 操作实例
     * @description 可用删除，新增，移动等操作
     *
     * @example  actionRef?.current.add?.({},1);
     * @example  actionRef?.current.remove?.(1);
     * @example  actionRef?.current.move?.(1,2);
     * @example  actionRef?.current.get?.(1);
     * @example  actionRef?.current.getList?.();
     */
    actionRef?: React.MutableRefObject<FormListActionType<T> | undefined>;
    /** 放在div上面的属性 */
    style?: React.CSSProperties;
    /**
     * 数据新增成功回调
     */
    onAfterAdd?: (
      ...params: [...Parameters<FormListOperation['add']>, number]
    ) => void;
    /**
     * 数据移除成功回调
     */
    onAfterRemove?: (
      ...params: [...Parameters<FormListOperation['remove']>, number]
    ) => void;
    /** 是否同时校验列表是否为空 */
    isValidateList?: boolean;
    /** 当 isValidateList 为 true 时执行为空提示 */
    emptyListMessage?: string;
    rules?: (Required<FormListProps>['rules'][number] & {
      required?: boolean;
    })[];
    required?: boolean;
    wrapperCol?: ColProps;
    className?: string;
    readonly?: boolean;
  } & Pick<ProFormGridConfig, 'colProps' | 'rowProps'>;

function ProFormList<T>(props: ProFormListProps<T>) {
  /** 保存经过 actionGuard 包装、带 onAfterAdd/onAfterRemove 回调的 action（#8939） */
  const guardedActionRef = useRef<FormListOperation>();
  const context = useContext(ConfigProvider.ConfigContext);
  const listContext = useContext(FormListContext);
  const baseClassName = context.getPrefixCls('pro-form-list');
  // Internationalization
  const intl = useIntl();
  /** 从 context 中拿到的值 */
  const { setFieldValueType } = React.useContext(FieldContext);

  const {
    transform,
    convertValue,
    actionRender,
    creatorButtonProps,
    label,
    alwaysShowItemLabel,
    tooltip,
    creatorRecord,
    itemRender,
    rules,
    itemContainerRender,
    fieldExtraRender,
    copyIconProps = {
      Icon: CopyOutlined,
      tooltipText: intl.getMessage('copyThisLine', '复制此项'),
    },
    children,
    deleteIconProps = {
      Icon: DeleteOutlined,
      tooltipText: intl.getMessage('deleteThisLine', '删除此项'),
    },
    arrowSort,
    upIconProps = {
      Icon: ArrowUpOutlined,
      tooltipText: intl.getMessage('sortUpThisLine', '向上排序'),
    },
    downIconProps = {
      Icon: ArrowDownOutlined,
      tooltipText: intl.getMessage('sortDownThisLine', '向下排序'),
    },
    actionRef,
    style,
    prefixCls,
    actionGuard,
    min,
    max,
    colProps,
    wrapperCol,
    rowProps,
    onAfterAdd,
    onAfterRemove,
    isValidateList = false,
    emptyListMessage = '列表不能为空',
    className,
    containerClassName,
    containerStyle,
    readonly,
    ...rest
  } = props;

  const { ColWrapper, RowWrapper } = useGridHelpers({ colProps, rowProps });

  const proFormContext = useContext(ProFormContext);
  const formInstance = Form.useFormInstance();

  // 处理 list 的嵌套
  const name = useMemo(() => {
    if (listContext.name === undefined) {
      return [rest.name].flat(1);
    }
    // render-prop 场景用户已传入 [index, 'key']（antd 惯例，Form.List 会自动补外层前缀），
    // 不再重复拼 listContext.name，否则会生成 items.0.0.key 的双重索引（#9129/#9238）
    const nameArray = [rest.name].flat(1);
    if (nameArray[0] === listContext.name) {
      return nameArray;
    }
    return [listContext.name, rest.name].flat(1);
  }, [listContext.name, rest.name]);

  const fieldValueTypeName = useMemo(() => {
    const nameArray = [props.name]
      .flat(1)
      .filter((itemName) => itemName !== undefined);
    if (listContext.listName === undefined) return nameArray;
    if (
      nameArray[0] === listContext.name &&
      Array.isArray(listContext.listName)
    ) {
      return [...listContext.listName.slice(0, -1), ...nameArray];
    }
    return [listContext.listName, props.name]
      .flat(1)
      .filter((itemName) => itemName !== undefined);
  }, [listContext.listName, listContext.name, props.name]);

  useImperativeHandle(
    actionRef,
    () =>
      ({
        // 每次调用都转发到最新一轮渲染生成的 action，避免列表长度变化后
        // actionRef 仍捕获旧 count，导致 guard 与 after 回调收到过期值（#8939）。
        add: (...args: Parameters<FormListOperation['add']>) =>
          guardedActionRef.current?.add(...args),
        remove: (...args: Parameters<FormListOperation['remove']>) =>
          guardedActionRef.current?.remove(...args),
        move: (...args: Parameters<FormListOperation['move']>) =>
          guardedActionRef.current?.move(...args),
        get: (index: number) => {
          return proFormContext.formRef!.current!.getFieldValue([
            ...name,
            index,
          ]);
        },
        getList: () =>
          proFormContext.formRef!.current!.getFieldValue([...name]),
      }) as any,
    [name, proFormContext.formRef],
  );

  useEffect(() => {
    noteOnce(
      !!proFormContext.formRef,
      `ProFormList 必须要放到 ProForm 中,否则会造成行为异常。`,
    );
    noteOnce(
      !!proFormContext.formRef,
      `Proformlist must be placed in ProForm, otherwise it will cause abnormal behavior.`,
    );
  }, [proFormContext.formRef]);

  useEffect(() => {
    // 如果 setFieldValueType 和 props.name 不存在不存入
    if (!setFieldValueType || !props.name) {
      return;
    }

    // Field.type === 'ProField' 时 props 里面是有 valueType 的，所以要设置一下
    // 写一个 ts 比较麻烦，用 any 顶一下
    setFieldValueType(fieldValueTypeName, {
      valueType: 'formList',
      convertValue,
      transform,
    });
    return () => {
      setFieldValueType(fieldValueTypeName, { valueType: 'formList' });
    };
  }, [
    convertValue,
    fieldValueTypeName,
    props.name,
    setFieldValueType,
    transform,
  ]);

  /** 当 isValidateList=true 时触发校验，提取消除 onAfterAdd/onAfterRemove 里的重复判断 */
  const validateIfNeeded = () => {
    if (!isValidateList) return;
    proFormContext.formRef!.current!.validateFields([name]);
  };

  const { wrapSSR, hashId } = useStyle(baseClassName);

  if (!proFormContext.formRef) return null;
  return wrapSSR(
    <ColWrapper>
      <div className={clsx(baseClassName, hashId)} style={style}>
        <Form.Item
          label={label}
          prefixCls={prefixCls}
          tooltip={tooltip}
          style={style}
          required={rules?.some((rule) => rule.required)}
          wrapperCol={wrapperCol}
          className={className}
          {...rest}
          name={isValidateList ? name : undefined}
          rules={
            isValidateList
              ? [
                  {
                    validator: (rule, value) => {
                      if (!value || value.length === 0) {
                        return Promise.reject(new Error(emptyListMessage));
                      }
                      return Promise.resolve();
                    },
                    required: true,
                  },
                ]
              : undefined
          }
        >
          {(() => {
            const listDom = (
              <Form.List rules={rules} {...rest} name={name}>
                {(fields, action, meta) => {
                  return (
                    <RowWrapper>
                      <ProFormListContainer
                        name={name}
                        guardedActionRef={guardedActionRef}
                        readonly={!!readonly}
                        originName={rest.name}
                        copyIconProps={copyIconProps}
                        deleteIconProps={deleteIconProps}
                        arrowSort={arrowSort}
                        upIconProps={upIconProps}
                        downIconProps={downIconProps}
                        formInstance={proFormContext.formRef!.current!}
                        prefixCls={baseClassName}
                        meta={meta}
                        fields={fields}
                        itemContainerRender={itemContainerRender}
                        itemRender={itemRender}
                        fieldExtraRender={fieldExtraRender}
                        creatorButtonProps={creatorButtonProps}
                        creatorRecord={creatorRecord}
                        actionRender={actionRender}
                        action={action}
                        actionGuard={actionGuard}
                        alwaysShowItemLabel={alwaysShowItemLabel}
                        min={min}
                        max={max}
                        count={fields.length}
                        onAfterAdd={(defaultValue, insertIndex, count) => {
                          validateIfNeeded();
                          onAfterAdd?.(defaultValue, insertIndex, count);
                        }}
                        onAfterRemove={(index, count) => {
                          if (count === 0) validateIfNeeded();
                          onAfterRemove?.(index, count);
                        }}
                        containerClassName={containerClassName}
                        containerStyle={containerStyle}
                      >
                        {children}
                      </ProFormListContainer>
                      <Form.ErrorList errors={meta.errors} />
                    </RowWrapper>
                  );
                }}
              </Form.List>
            );
            return convertValue ? (
              <ProFormListValueConverter
                convertValue={convertValue}
                form={formInstance}
                name={fieldValueTypeName}
              >
                {listDom}
              </ProFormListValueConverter>
            ) : (
              listDom
            );
          })()}
        </Form.Item>
      </div>
    </ColWrapper>,
  );
}

export { FormListContext, ProFormList };
