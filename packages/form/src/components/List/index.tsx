import type { ReactNode } from 'react';
import React, { useContext, useImperativeHandle, useRef, useMemo } from 'react';
import type { ButtonProps, FormInstance } from 'antd';
import omit from 'omit.js';
import toArray from 'rc-util/lib/Children/toArray';
import { Button, Form, Tooltip, ConfigProvider } from 'antd';
import type { FormListFieldData, FormListOperation, FormListProps } from 'antd/lib/form/FormList';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { NamePath } from 'antd/lib/form/interface';
import { DeleteOutlined, PlusOutlined, CopyOutlined } from '@ant-design/icons';

import './index.less';
import get from 'rc-util/lib/utils/get';
import { runFunction } from '@ant-design/pro-utils';

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

export type ProFormListProps = Omit<FormListProps, 'children'> & {
  creatorButtonProps?:
    | false
    | (ButtonProps & {
        creatorButtonText?: ReactNode;
        position?: 'top' | 'bottom';
      });
  creatorRecord?: Record<string, any> | (() => Record<string, any>);
  label?: ReactNode;
  tooltip?: LabelTooltipType;
  actionRender?: (
    field: FormListFieldData,
    action: FormListOperation,
    defaultActionDom: ReactNode[],
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
    children,
    actionRender,
    fields,
    meta,
    field,
    index,
    formInstance,
    ...rest
  } = props;
  const listContext = useContext(FormListContext);

  const childrenArray = listToArray(children)
    .map((childrenItem) => {
      if (typeof childrenItem === 'function') {
        return (childrenItem as ChildrenItemFunction)?.(field, index, action);
      }
      return childrenItem;
    })
    .map((childrenItem, childIndex) => {
      if (React.isValidElement(childrenItem)) {
        return React.cloneElement(childrenItem, {
          // eslint-disable-next-line react/no-array-index-key
          key: childIndex,
          ...childrenItem?.props,
        });
      }
      return childrenItem;
    });

  const copyIcon = useMemo(() => {
    /** 复制按钮的配置 */
    if (!copyIconProps) return null;
    const { Icon = CopyOutlined, tooltipText } = copyIconProps as IconConfig;
    return (
      <Tooltip title={tooltipText} key="copy">
        <Icon
          className={`${prefixCls}-action-icon`}
          onClick={() => {
            action.add(
              formInstance?.getFieldValue(
                [listContext.listName, rest.name, field.name]
                  .filter((item) => item !== undefined)
                  .flat(1),
              ),
            );
          }}
        />
      </Tooltip>
    );
  }, [action, copyIconProps, field.name, formInstance, listContext.listName, prefixCls, rest.name]);

  const deleteIcon = useMemo(() => {
    if (!deleteIconProps) return null;
    const { Icon = DeleteOutlined, tooltipText } = deleteIconProps;
    return (
      <Tooltip title={tooltipText} key="delete">
        <Icon className={`${prefixCls}-action-icon`} onClick={() => action.remove(field.name)} />
      </Tooltip>
    );
  }, [action, deleteIconProps, field.name, prefixCls]);

  const defaultActionDom: React.ReactNode[] = useMemo(
    () => [copyIcon, deleteIcon].filter(Boolean),
    [copyIcon, deleteIcon],
  );

  const actions = actionRender?.(field, action, defaultActionDom) || defaultActionDom;

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
      className={`${prefixCls}-item`}
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
  const { creatorButtonProps, prefixCls, children, creatorRecord, action, fields } = props;

  const creatorButton = useMemo(() => {
    if (creatorButtonProps === false) return null;
    const { position = 'bottom', creatorButtonText = '添加一行数据' } = creatorButtonProps || {};
    return (
      <Button
        className={`${prefixCls}-creator-button-${position}`}
        type="dashed"
        block
        icon={<PlusOutlined />}
        {...omit(creatorButtonProps || {}, ['position', 'creatorButtonText'])}
        onClick={() => {
          let index;
          // 如果是顶部，加到第一个，如果不是，为空就是最后一个
          if (position === 'top') index = 0;

          action.add(runFunction(creatorRecord), index);
        }}
      >
        {creatorButtonText}
      </Button>
    );
  }, [action, creatorButtonProps, creatorRecord, prefixCls]);

  return (
    <div
      style={{
        width: 'max-content',
        maxWidth: '100%',
      }}
    >
      {creatorButtonProps !== false && creatorButtonProps?.position === 'top' && creatorButton}
      {fields.map((field, index) => (
        <ProFormListItem key={field.key} {...props} field={field} index={index}>
          {children}
        </ProFormListItem>
      ))}
      {creatorButtonProps !== false && creatorButtonProps?.position !== 'top' && creatorButton}
    </div>
  );
};

const ProFormList: React.FC<ProFormListProps> = ({
  actionRender,
  creatorButtonProps,
  label,
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

  return (
    <Form.Item
      label={label}
      tooltip={tooltip}
      rules={rules}
      shouldUpdate={(prevValues, nextValues) => {
        return get(prevValues, name) !== get(nextValues, name);
      }}
    >
      {(formInstance) => {
        return (
          <div className={baseClassName}>
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
                      formInstance={formInstance as any}
                      prefixCls={baseClassName}
                      meta={meta}
                      fields={fields}
                      itemContainerRender={itemContainerRender}
                      itemRender={itemRender}
                      creatorButtonProps={creatorButtonProps}
                      creatorRecord={creatorRecord}
                      actionRender={actionRender}
                      action={action}
                    >
                      {children}
                    </ProFormListContainer>
                    <Form.ErrorList errors={meta.errors} />
                  </>
                );
              }}
            </Form.List>
          </div>
        );
      }}
    </Form.Item>
  );
};

export { FormListContext };

export default ProFormList;
