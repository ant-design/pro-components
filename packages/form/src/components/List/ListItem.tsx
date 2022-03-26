import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ButtonProps, FormInstance } from 'antd';
import { Spin, Tooltip } from 'antd';
import type { FormListFieldData, FormListOperation, FormListProps } from 'antd/lib/form/FormList';
import toArray from 'rc-util/lib/Children/toArray';
import { noteOnce } from 'rc-util/lib/warning';
import React from 'react';
import type { ReactNode } from 'react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FormListContext } from '.';
import { useGridHelpers } from '../../helpers';
import set from 'rc-util/lib/utils/set';

export type ChildrenItemFunction = (
  /**
   * @name 当前行的meta信息
   * @example {name: number; key: number}
   */
  meta: FormListFieldData,
  /**
   * @name 当前行的行号
   */
  index: number,
  /**
   * @name 用于操作行的一些快捷方法
   * @example 给第二行增加数据 action.add?.({},1);
   * @example 删除第二行 action.remove?.(1);
   * @example 从 1 移到 2: action.move?.(2,1);
   * @example 获取当前行的数据: action.getCurrentRowData() -> {id:"xxx",name:'123',age:18}
   * @example 设置当前行的数据: {id:"123",name:'123'} -> action.setCurrentRowData({name:'xxx'}) -> {id:"123",name:'xxx'}
   * @example 清空当前行的数据：{id:"123",name:'123'} -> action.setCurrentRowData({name:undefined}) -> {id:"123"}
   */
  action: FormListOperation & {
    /**
     * @name 获取当前行的数据
     * @example getCurrentRowData -> {id:"xxx",name:'123',age:18}
     */
    getCurrentRowData: () => any;
    /**
     * @name 设置当前行的数据
     * @example {id:"123",name:'123'} -> setCurrentRowData({name:'xxx'}) -> {id:"123",name:'123'}
     * @example {id:"123",name:'123'} -> setCurrentRowData({name:undefined}) -> {id:"123"}
     */
    setCurrentRowData: (data: any) => void;
  },
) => React.ReactNode;

export type IconConfig = {
  Icon?: React.FC<any>;
  tooltipText?: string;
};

/** Antd 自带的toArray 不支持方法，所以需要自己搞一个 */
const listToArray = (children?: ReactNode | ReactNode[]) => {
  if (Array.isArray(children)) {
    return children;
  }
  if (typeof children === 'function') {
    return [children];
  }
  return toArray(children);
};

export type FormListActionGuard = {
  beforeAddRow?: (
    ...params: [...Parameters<FormListOperation['add']>, number]
  ) => boolean | Promise<boolean>;
  beforeRemoveRow?: (
    ...params: [...Parameters<FormListOperation['remove']>, number]
  ) => boolean | Promise<boolean>;
};

export type ProFromListCommonProps = {
  creatorButtonProps?:
    | false
    | (ButtonProps & {
        creatorButtonText?: ReactNode;
        position?: 'top' | 'bottom';
      });
  /**
   * @name 复制按钮的配置
   * @description 可以自定义复制按钮的文案，图标，tooltip，设置为 false 就会消失
   * @type {IconConfig|false}
   */
  copyIconProps?: IconConfig | false;
  /**
   * @name 删除按钮的配置
   * @description 可以自定义删除按钮的文案，图标，tooltip，设置为 false 就会消失
   * @type {IconConfig|false}
   */
  deleteIconProps?: IconConfig | false;

  creatorRecord?: Record<string, any> | (() => Record<string, any>);
  actionRender?: (
    field: FormListFieldData,
    action: FormListOperation,
    defaultActionDom: ReactNode[],
    count: number,
  ) => ReactNode[];
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
      name: FormListProps['name'];
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
  alwaysShowItemLabel?: boolean;
  /** 允许增加的最大条数 */
  max?: number;
  /** 允许增加的最少条数，删除时校验 */
  min?: number;
};

export type ProFormListItemProps = ProFromListCommonProps & {
  formInstance: FormInstance;
  action: FormListOperation;
  actionGuard?: FormListActionGuard;
  prefixCls: string;
  fields: FormListFieldData[];
  meta: {
    errors: ReactNode[];
  };
  name: FormListProps['name'];
  originName: FormListProps['name'];

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
    alwaysShowItemLabel,
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
    originName,
    min,
    max,
    count,
    ...rest
  } = props;

  const listContext = useContext(FormListContext);

  const unmountedRef = useRef(false);

  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState(false);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  const getCurrentRowData = () => {
    return formInstance.getFieldValue([originName, index?.toString()].flat(1).filter(Boolean));
  };
  const formListAction = {
    getCurrentRowData,
    setCurrentRowData: (data: Record<string, any>) => {
      const oldTableDate = formInstance?.getFieldsValue?.() || {};
      const rowKeyName = [originName, index?.toString()].flat(1).filter(Boolean);
      const updateValues = set(oldTableDate, rowKeyName, {
        // 只是简单的覆盖，如果很复杂的话，需要自己处理
        ...getCurrentRowData(),
        ...(data || {}),
      });
      return formInstance.setFieldsValue(updateValues);
    },
  };

  const childrenArray = listToArray(children)
    .map((childrenItem) => {
      if (typeof childrenItem === 'function') {
        return (childrenItem as ChildrenItemFunction)?.(field, index, {
          ...action,
          ...formListAction,
        });
      }
      return childrenItem;
    })
    .map((childrenItem, itemIndex) => {
      if (React.isValidElement(childrenItem)) {
        const hasKey =
          !!childrenItem.key ||
          !!childrenItem?.props?.name ||
          childrenItem?.type?.toString() === 'Symbol(react.fragment)';

        noteOnce(
          hasKey,
          'ProFormList 的 children 不设置 key 可能导致更新不及时或者修改不生效的问题，请设置 key。',
        );
        noteOnce(
          hasKey,
          "ProFormList's children do not set the key may cause updates not to be timely or the modification does not take effect, please set the key.",
        );
        return React.cloneElement(childrenItem, {
          key: childrenItem.key || childrenItem?.props?.name || itemIndex,
          ...childrenItem?.props,
        });
      }
      return childrenItem;
    });
  const copyIcon = useMemo(() => {
    /** 复制按钮的配置 */
    if (copyIconProps === false || max === count) return null;
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
    if (deleteIconProps === false || min === count) return null;
    const { Icon = DeleteOutlined, tooltipText } = deleteIconProps!;
    return (
      <Tooltip title={tooltipText} key="delete">
        <Spin spinning={loadingRemove}>
          <Icon
            className={`${prefixCls}-action-icon action-remove`}
            onClick={async () => {
              setLoadingRemove(true);
              await action.remove(field.name);
              if (!unmountedRef.current) {
                setLoadingRemove(false);
              }
            }}
          />
        </Spin>
      </Tooltip>
    );
  }, [deleteIconProps, min, count, loadingRemove, prefixCls, setLoadingRemove, action, field.name]);

  const defaultActionDom: React.ReactNode[] = useMemo(
    () => [copyIcon, deleteIcon].filter(Boolean),
    [copyIcon, deleteIcon],
  );

  const actions = actionRender?.(field, action, defaultActionDom, count) || defaultActionDom;

  const dom = actions.length > 0 ? <div className={`${prefixCls}-action`}>{actions}</div> : null;

  const options = {
    name: rest.name,
    field,
    index,
    record: formInstance?.getFieldValue?.(
      [listContext.listName, rest.name, field.name].filter((item) => item !== undefined).flat(1),
    ),
    fields,
    operation: action,
    meta,
  };

  const { grid } = useGridHelpers();

  const itemContainer = itemContainerRender?.(childrenArray, options) || childrenArray;

  const contentDom = itemRender?.(
    {
      listDom: (
        <div
          className={`${prefixCls}-container`}
          style={{
            width: grid ? '100%' : undefined,
          }}
        >
          {itemContainer}
        </div>
      ),
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
      <div
        className={`${prefixCls}-container`}
        style={{
          width: grid ? '100%' : undefined,
        }}
      >
        {itemContainer}
      </div>
      {dom}
    </div>
  );

  return (
    <FormListContext.Provider
      key={field.name}
      value={{
        ...field,
        listName: [listContext.listName, originName, field.name]
          .filter((item) => item !== undefined)
          .flat(1),
      }}
    >
      {contentDom}
    </FormListContext.Provider>
  );
};

export { ProFormListItem };
