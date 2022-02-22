import { CopyOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid, runFunction, ProFormContext } from '@ant-design/pro-utils';
import type { ButtonProps, FormInstance } from 'antd';
import { Spin } from 'antd';
import { Button, ConfigProvider, Form, Tooltip } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { FormListFieldData, FormListOperation, FormListProps } from 'antd/lib/form/FormList';
import type { NamePath } from 'antd/lib/form/interface';
import omit from 'omit.js';
import toArray from 'rc-util/lib/Children/toArray';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import React, { useContext, useImperativeHandle, useMemo, useRef } from 'react';
import './index.less';
import { noteOnce } from 'rc-util/lib/warning';
import type { StoreValue } from 'rc-field-form/es/interface';

type IconConfig = {
  Icon?: React.FC<any>;
  tooltipText?: string;
};

const FormListContext = React.createContext<
  | (FormListFieldData & {
      listName: NamePath;
    })
  | Record<string, any>
>({});

// type ChildrenFunction = (
//   fields: FormListFieldData[],
//   operation: FormListOperation,
//   meta: {
//     errors: React.ReactNode[];
//   },
// ) => React.ReactNode;

type ChildrenItemFunction = (
  field: FormListFieldData,
  index: number,
  operation: FormListOperation,
) => React.ReactNode;

type FormListActionGuard = {
  beforeAddRow?: (
    defaultValue?: StoreValue,
    insertIndex?: number,
    count?: number,
  ) => boolean | Promise<boolean>;
  beforeRemoveRow?: (index: number | number[], count?: number) => boolean | Promise<boolean>;
};

export type ProFormListProps = Omit<FormListProps, 'children'> & {
  creatorButtonProps?:
    | false
    | (ButtonProps & {
        creatorButtonText?: ReactNode;
        position?: 'top' | 'bottom';
      });
  creatorRecord?: Record<string, any> | (() => Record<string, any>);
  label?: ReactNode;
  alwaysShowItemLabel?: boolean;
  tooltip?: LabelTooltipType;
  actionGuard?: FormListActionGuard;
  actionRender?: (
    field: FormListFieldData,
    action: FormListOperation,
    defaultActionDom: ReactNode[],
    count: number,
  ) => ReactNode[];
  children: ReactNode | ChildrenItemFunction;
  itemContainerRender?: (
    doms: ReactNode,
    listMeta: {
      field: FormListFieldData;
      fields: FormListFieldData[];
      index: number;
      operation: FormListOperation;
      record: Record<string, any>;
      meta: {
        errors: React.ReactNode[];
      };
    },
  ) => ReactNode;
  /** 自定义Item，可以用来将 action 放到别的地方 */
  itemRender?: (
    doms: { listDom: ReactNode; action: ReactNode },
    listMeta: {
      field: FormListFieldData;
      fields: FormListFieldData[];
      index: number;
      operation: FormListOperation;
      record: Record<string, any>;
      meta: {
        errors: React.ReactNode[];
      };
    },
  ) => ReactNode;
  copyIconProps?: IconConfig | false;
  deleteIconProps?: IconConfig | false;
  actionRef?: React.MutableRefObject<FormListOperation | undefined>;
  /** 放在div上面的属性 */
  style?: React.CSSProperties;
  /** 允许增加的最大条数 */
  max?: number;
  /** 允许增加的最少条数，删除时校验 */
  min?: number;
};

/** Antd 自带的toArray 不这次方法，所以需要自己搞一个 */
const listToArray = (children?: ReactNode | ReactNode[]) => {
  if (Array.isArray(children)) {
    return children;
  }
  if (typeof children === 'function') {
    return [children];
  }
  return toArray(children);
};

type ProFormListItemProps = {
  creatorButtonProps: ProFormListProps['creatorButtonProps'];
  formInstance: FormInstance;
  copyIconProps: ProFormListProps['copyIconProps'];
  deleteIconProps: ProFormListProps['deleteIconProps'];
  action: FormListOperation;
  actionGuard?: FormListActionGuard;
  creatorRecord: ProFormListProps['creatorRecord'];
  actionRender: ProFormListProps['actionRender'];
  itemContainerRender: ProFormListProps['itemContainerRender'];
  itemRender: ProFormListProps['itemRender'];
  prefixCls: string;
  fields: FormListFieldData[];
  meta: {
    errors: ReactNode[];
  };
  name: ProFormListProps['name'];
  originName: ProFormListProps['name'];
  alwaysShowItemLabel: ProFormListProps['alwaysShowItemLabel'];
  max: ProFormListProps['max'];
  min: ProFormListProps['min'];
  /** 列表当前条目数量 */
  count: number;
};

const ProFormListItem: React.FC<
  ProFormListItemProps & {
    field: FormListFieldData;
    index: number;
  }
> = (props) => {
  const {
    creatorButtonProps,
    deleteIconProps,
    copyIconProps,
    itemContainerRender,
    itemRender,
    prefixCls,
    creatorRecord,
    action,
    actionGuard,
    children,
    actionRender,
    fields,
    meta,
    field,
    index,
    formInstance,
    alwaysShowItemLabel,
    min,
    max,
    count,
    ...rest
  } = props;
  const listContext = useContext(FormListContext);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState(false);

  const childrenArray = listToArray(children)
    .map((childrenItem) => {
      if (typeof childrenItem === 'function') {
        return (childrenItem as ChildrenItemFunction)?.(field, index, action);
      }
      return childrenItem;
    })
    .map((childrenItem) => {
      if (React.isValidElement(childrenItem)) {
        return React.cloneElement(childrenItem, {
          key: childrenItem.key || nanoid(),
          ...childrenItem?.props,
        });
      }
      return childrenItem;
    });

  const copyIcon = useMemo(() => {
    /** 复制按钮的配置 */
    if (!copyIconProps || max === count) return null;
    const { Icon = CopyOutlined, tooltipText } = copyIconProps as IconConfig;
    return (
      <Tooltip title={tooltipText} key="copy">
        <Spin spinning={loadingCopy}>
          <Icon
            className={`${prefixCls}-action-icon action-copy`}
            onClick={async () => {
              setLoadingCopy(true);
              await action.add(
                formInstance?.getFieldValue(
                  [listContext.listName, rest.name, field.name]
                    .filter((item) => item !== undefined)
                    .flat(1),
                ),
              );
              setLoadingCopy(false);
            }}
          />
        </Spin>
      </Tooltip>
    );
  }, [
    copyIconProps,
    max,
    count,
    loadingCopy,
    prefixCls,
    action,
    formInstance,
    listContext.listName,
    rest.name,
    field.name,
  ]);

  const deleteIcon = useMemo(() => {
    if (!deleteIconProps || min === count) return null;
    const { Icon = DeleteOutlined, tooltipText } = deleteIconProps;
    return (
      <Tooltip title={tooltipText} key="delete">
        <Spin spinning={loadingRemove}>
          <Icon
            className={`${prefixCls}-action-icon action-remove`}
            onClick={async () => {
              setLoadingRemove(true);
              await action.remove(field.name);
              setLoadingRemove(false);
            }}
          />
        </Spin>
      </Tooltip>
    );
  }, [deleteIconProps, min, count, loadingRemove, prefixCls, action, field.name]);

  const defaultActionDom: React.ReactNode[] = useMemo(
    () => [copyIcon, deleteIcon].filter(Boolean),
    [copyIcon, deleteIcon],
  );

  const actions = actionRender?.(field, action, defaultActionDom, count) || defaultActionDom;

  const dom = actions.length > 0 ? <div className={`${prefixCls}-action`}>{actions}</div> : null;

  const options = {
    field,
    index,
    record: formInstance?.getFieldValue?.(
      [listContext.listName, rest.name, field.name].filter((item) => item !== undefined).flat(1),
    ),
    fields,
    operation: action,
    meta,
  };
  const itemContainer = itemContainerRender?.(childrenArray, options) || childrenArray;

  const contentDom = itemRender?.(
    {
      listDom: <div className={`${prefixCls}-container`}>{itemContainer}</div>,
      action: dom,
    },
    options,
  ) || (
    <div
      className={`${prefixCls}-item${alwaysShowItemLabel ? ` ${prefixCls}-item-show-label` : ''}`}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div className={`${prefixCls}-container`}>{itemContainer}</div>
      {dom}
    </div>
  );
  return (
    <FormListContext.Provider
      key={field.name}
      value={{
        ...field,
        listName: [listContext.listName, rest.originName, field.name]
          .filter((item) => item !== undefined)
          .flat(1),
      }}
    >
      {contentDom}
    </FormListContext.Provider>
  );
};

const ProFormListContainer: React.FC<ProFormListItemProps> = (props) => {
  const {
    creatorButtonProps,
    prefixCls,
    children,
    creatorRecord,
    action,
    fields,
    actionGuard,
    max,
  } = props;
  const fieldKeyMap = useRef(new Map<string, string>());
  const [loading, setLoading] = useState(false);

  const uuidFields = useMemo(() => {
    return fields.map((field) => {
      if (!fieldKeyMap.current?.has(field.key.toString())) {
        fieldKeyMap.current?.set(field.key.toString(), nanoid());
      }
      const uuid = fieldKeyMap.current?.get(field.key.toString());
      return {
        ...field,
        uuid,
      };
    });
  }, [fields]);

  /**
   * 根据行为守卫包装action函数
   */
  const wrapperAction = useMemo(() => {
    const wrapAction = { ...action };
    const count = uuidFields.length;
    Object.keys(action).forEach((key) => {
      switch (key) {
        case 'add':
          wrapAction.add = async (defaultValue?: StoreValue, insertIndex?: number) => {
            if (!actionGuard?.beforeAddRow) {
              action.add(defaultValue, insertIndex);
              return;
            }
            const needAdd = await actionGuard.beforeAddRow?.(defaultValue, insertIndex, count);
            if (!needAdd) return;
            action.add(defaultValue, insertIndex);
          };
          break;
        case 'remove':
          wrapAction.remove = async (idx: number | number[]) => {
            if (!actionGuard?.beforeRemoveRow) {
              action.remove(idx);
              return;
            }
            const needRemove = await actionGuard.beforeRemoveRow?.(idx, count);
            if (!needRemove) return;
            action.remove(idx);
          };
          break;
      }
    });
    return wrapAction;
  }, [action, actionGuard, uuidFields]);

  const creatorButton = useMemo(() => {
    if (creatorButtonProps === false || uuidFields.length === max) return null;
    const { position = 'bottom', creatorButtonText = '添加一行数据' } = creatorButtonProps || {};
    return (
      <Button
        className={`${prefixCls}-creator-button-${position}`}
        type="dashed"
        loading={loading}
        block
        icon={<PlusOutlined />}
        {...omit(creatorButtonProps || {}, ['position', 'creatorButtonText'])}
        onClick={async () => {
          setLoading(true);
          // 如果不是从顶部开始添加，则插入的索引为当前行数
          let index = uuidFields.length;
          // 如果是顶部，加到第一个，如果不是，为空就是最后一个
          if (position === 'top') index = 0;
          await wrapperAction.add(runFunction(creatorRecord), index);
          setLoading(false);
        }}
      >
        {creatorButtonText}
      </Button>
    );
  }, [creatorButtonProps, prefixCls, loading, wrapperAction, creatorRecord, uuidFields, max]);

  return (
    <div
      style={{
        width: 'max-content',
        maxWidth: '100%',
      }}
    >
      {creatorButtonProps !== false && creatorButtonProps?.position === 'top' && creatorButton}
      {uuidFields.map((field, index) => {
        return (
          <ProFormListItem
            {...props}
            key={field.uuid}
            field={field}
            index={index}
            action={wrapperAction}
            count={uuidFields.length}
          >
            {children}
          </ProFormListItem>
        );
      })}
      {creatorButtonProps !== false && creatorButtonProps?.position !== 'top' && creatorButton}
    </div>
  );
};

const ProFormList: React.FC<ProFormListProps> = ({
  actionRender,
  creatorButtonProps,
  label,
  alwaysShowItemLabel,
  tooltip,
  creatorRecord,
  itemRender,
  rules,
  itemContainerRender,
  copyIconProps = {
    Icon: CopyOutlined,
    tooltipText: '复制此行',
  },
  children,
  deleteIconProps = {
    Icon: DeleteOutlined,
    tooltipText: '删除此行',
  },
  actionRef,
  style,
  prefixCls,
  actionGuard,
  min,
  max,
  ...rest
}) => {
  const actionRefs = useRef<FormListOperation>();
  const context = useContext(ConfigProvider.ConfigContext);
  const listContext = useContext(FormListContext);
  const baseClassName = context.getPrefixCls('pro-form-list');
  // 处理 list 的嵌套
  const name = useMemo(() => {
    if (listContext.name === undefined) {
      return [rest.name].flat(1);
    }
    return [listContext.name, rest.name].flat(1);
  }, [listContext.name, rest.name]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useImperativeHandle(actionRef, () => actionRefs.current, [actionRefs.current]);
  const proFormContext = useContext(ProFormContext);

  useEffect(() => {
    noteOnce(!!proFormContext.formRef, `ProFormList 必须要放到 ProForm 中,否则会造成行为异常。`);
    noteOnce(
      !!proFormContext.formRef,
      `Proformlist must be placed in ProForm, otherwise it will cause abnormal behavior.`,
    );
  }, [proFormContext.formRef]);

  if (!proFormContext.formRef) return null;

  return (
    <div className={baseClassName} style={style}>
      <Form.Item
        label={label}
        prefixCls={prefixCls}
        tooltip={tooltip}
        style={style}
        {...rest}
        name={undefined}
        rules={undefined}
      >
        <Form.List rules={rules} {...rest} name={name}>
          {(fields, action, meta) => {
            // 将 action 暴露给外部
            actionRefs.current = action;
            return (
              <>
                <ProFormListContainer
                  name={name}
                  originName={rest.name}
                  copyIconProps={copyIconProps}
                  deleteIconProps={deleteIconProps}
                  formInstance={proFormContext.formRef!.current!}
                  prefixCls={baseClassName}
                  meta={meta}
                  fields={fields}
                  itemContainerRender={itemContainerRender}
                  itemRender={itemRender}
                  creatorButtonProps={creatorButtonProps}
                  creatorRecord={creatorRecord}
                  actionRender={actionRender}
                  action={action}
                  actionGuard={actionGuard}
                  alwaysShowItemLabel={alwaysShowItemLabel}
                  min={min}
                  max={max}
                  count={fields.length}
                >
                  {children}
                </ProFormListContainer>
                <Form.ErrorList errors={meta.errors} />
              </>
            );
          }}
        </Form.List>
      </Form.Item>
    </div>
  );
};

export { FormListContext };

export default ProFormList;
