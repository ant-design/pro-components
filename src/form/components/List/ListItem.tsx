﻿import { ArrowDownOutlined, ArrowUpOutlined, CopyOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { set, toArray } from '@rc-component/util';
import type { ButtonProps, FormInstance } from 'antd';
import { ConfigProvider, Tooltip } from 'antd';
import type { FormListFieldData, FormListOperation, FormListProps } from 'antd/es/form/FormList';
import classNames from 'classnames';
import type { CSSProperties, ReactNode } from 'react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FormListContext } from '.';
import { ProProvider } from '../../../provider';
import type { SearchTransformKeyFn } from '../../../utils';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import { useGridHelpers } from '../../helpers';

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
  /**
   * 透传总行数
   */
  count: number,
) => React.ReactNode;

export type IconConfig = {
  /**
   * 新的icon的组件，我们会将其实例化
   * Icon: ()=> <div/>
   */
  Icon?: React.FC<any>;
  /**
   * tooltip 的提示文案
   */
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

export type FormListListListMete = {
  name: FormListProps['name'];
  field: FormListFieldData;
  fields: FormListFieldData[];
  index: number;
  operation: FormListOperation;
  record: Record<string, any>;
  meta: {
    errors: React.ReactNode[];
  };
};

export type FormListActionGuard = {
  /**
   * @name 添加行之前的钩子，返回false，会阻止这个行为
   *
   * @example 阻止新增 beforeAddRow={()=> return false}
   */
  beforeAddRow?: (...params: [...Parameters<FormListOperation['add']>, number]) => boolean | Promise<boolean>;
  /**
   * @name 删除行之前的钩子，返回false，会阻止这个行为
   *
   * @example 阻止删除 beforeAddRow={()=> return false}
   */
  beforeRemoveRow?: (...params: [...Parameters<FormListOperation['remove']>, number]) => boolean | Promise<boolean>;
};

export type ProFromListCommonProps = {
  /**
   * @name 提交时转化值，一般用于将值转化为提交的数据
   * @param value 字段的值
   * @param namePath 字段的name
   * @param allValues 所有的字段
   * @returns 字段新的值，如果返回对象，会和所有值 merge 一次
   *
   * @example {name:[a,b] => {name:a,b }    transform: (value,namePath,allValues)=> value.join(",")
   * @example {name: string => { newName:string }    transform: (value,namePath,allValues)=> { newName:value }
   * @example {name:dayjs} => {name:string transform: (value,namePath,allValues)=> value.format("YYYY-MM-DD")
   * @example {name:dayjs}=> {name:时间戳} transform: (value,namePath,allValues)=> value.valueOf()
   * @example {name:{value,label}} => { name:string} transform: (value,namePath,allValues)=> value.value
   * @example {name:{value,label}} => { valueName,labelName  } transform: (value,namePath,allValues)=> { valueName:value.value, labelName:value.name }
   */
  transform?: SearchTransformKeyFn;
  /**
   * @name 自定义新增按钮的配置
   * @example 设置按钮到顶部
   * creatorButtonProps={{position:"top"}}
   * @example 不显示按钮
   * creatorButtonProps={false}
   * @example 自定义按钮文案
   * creatorButtonProps={{creatorButtonText:"新增一行到底部"}}
   * @example 设置按钮类型
   * creatorButtonProps={{type:"primary"}}
   */
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
  /**
   * @name 向上排序按钮的配置
   * @description 可以自定义向上排序按钮的文案，图标，tooltip，设置为 false 就会消失
   * @type {IconConfig|false}
   */
  upIconProps?: IconConfig | false;
  /**
   * @name 向下排序按钮的配置
   * @description 可以自定义向下排序按钮的文案，图标，tooltip，设置为 false 就会消失
   * @type {IconConfig|false}
   */
  downIconProps?: IconConfig | false;
  /**
   * @name 箭头排序是否开启开关
   * @description 是否开启箭头排序 默认关闭
   * @type {boolean}
   */
  arrowSort?: boolean;

  /**
   * @name 新建增加的默认数据
   * @description 如果是个每次新增数据都会调用这个函数，返回一个默认的数据
   *
   * @example 新建的时候自动生成默认值
   * creatorRecord={{ age: 18}}
   * @example 每次生成新的数据都会生成 id
   * creatorRecord={()=>{ id: crypto.randomUUID()}}
   */
  creatorRecord?: Record<string, any> | (() => Record<string, any>);

  /**
   * @name 自定义操作按钮
   *
   * @example 删除按钮
   * actionRender:(field,action)=><a onClick={()=>action.remove(field.name)}>删除</a>
   * @example 最多只能新增三行
   * actionRender:(f,action,_,count)=><a onClick={()=>
   *   count>2?alert("最多三行！"):action.add({id:"xx"})}>删除
   * </a>
   */
  actionRender?: (
    field: FormListFieldData,
    /**
     * 操作能力
     * @example  action.add(data) 新增一行
     * @example  action.remove(index) 删除一行
     * @example  action.move(formIndex,targetIndex) 移动一行
     */
    action: FormListOperation,
    /**
     * 默认的操作dom
     * [复制，删除]
     */
    defaultActionDom: ReactNode[],
    /**
     * 当前共有几个列表项
     */
    count: number,
  ) => ReactNode[];
  /**
   * @name list 的内容的渲染函数
   *
   * @example 全部包再一个卡片里面
   * itemContainerRender: (doms,listMeta) => <Card title={listMeta.field.name}>{doms}</Card>
   */
  itemContainerRender?: (doms: ReactNode, listMeta: FormListListListMete) => ReactNode;
  /**
   * @name 自定义Item，可以用来将 action 放到别的地方
   *
   * @example 将每个item放到一个卡片里
   * itemRender: (dom,listMeta) => <Card extra={dom.action}  title={listMeta?.record?.name}>{dom.listDom}</Card>
   */
  itemRender?: (
    dom: { listDom: ReactNode; action: ReactNode },
    /**
     * list 的基本信息
     */
    listMeta: FormListListListMete,
  ) => ReactNode;
  /**
   * @name 总是展示每一行的label
   * @default:false
   */
  alwaysShowItemLabel?: boolean;
  /**
   * @name 允许增加的最大条数
   */
  max?: number;
  /**
   * @name 允许增加的最少条数，删除时校验
   */
  min?: number;
  /**
   * @name 盒子的类名称
   */
  containerClassName?: string;
  /**
   * @name 盒子的样式
   */
  containerStyle?: CSSProperties;
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
  fieldExtraRender?: (
    fieldAction: FormListOperation,
    meta: {
      errors?: React.ReactNode[];
      warnings?: React.ReactNode[];
    },
  ) => React.ReactNode;
  /** 列表当前条目数量 */
  count: number;

  children?: ReactNode | ChildrenItemFunction;
  /**
   * 数据新增成功回调
   */
  onAfterAdd?: (...params: [...Parameters<FormListOperation['add']>, number]) => void;
  /**
   * 数据移除成功回调
   */
  onAfterRemove?: (...params: [...Parameters<FormListOperation['remove']>, number]) => void;

  /** 是否只读模式 */
  readonly: boolean;
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
    arrowSort,
    upIconProps,
    downIconProps,
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
    containerClassName,
    containerStyle,
    min,
    max,
    count,
    ...rest
  } = props;
  const { hashId } = useContext(ProProvider);
  const { componentSize } = ConfigProvider.useConfig?.() || {
    componentSize: 'middle',
  };
  const listContext = useContext(FormListContext);
  const unmountedRef = useRef(false);

  const { mode } = useContext(EditOrReadOnlyContext);

  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingCopy, setLoadingCopy] = useState(false);

  useEffect(() => {
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  const getCurrentRowData = () => {
    return formInstance.getFieldValue(
      [listContext.listName, originName, index?.toString()]
        .flat(1)
        .filter((item) => item !== null && item !== undefined),
    );
  };
  const formListAction = {
    getCurrentRowData,
    setCurrentRowData: (data: Record<string, any>) => {
      const oldTableDate = formInstance?.getFieldsValue?.() || {};
      const rowKeyName = [listContext.listName, originName, index?.toString()]
        .flat(1)
        .filter((item) => item !== null && item !== undefined);
      const updateValues = set(oldTableDate, rowKeyName, {
        // 只是简单的覆盖，如果很复杂的话，需要自己处理
        ...getCurrentRowData(),
        ...(data || {}),
      });
      return formInstance.setFieldsValue(updateValues);
    },
  };

  const childrenArray = listToArray(children as React.ReactNode)
    .map((childrenItem) => {
      if (typeof childrenItem === 'function') {
        return (childrenItem as ChildrenItemFunction)?.(
          field,
          index,
          {
            ...action,
            ...formListAction,
          },
          count,
        );
      }
      return childrenItem;
    })
    .map((childrenItem, itemIndex) => {
      if (React.isValidElement(childrenItem)) {
        return React.cloneElement(childrenItem, {
          // @ts-ignore
          key: childrenItem.key || childrenItem?.props?.name || itemIndex,
          ...(childrenItem?.props || {}),
        });
      }
      return childrenItem;
    });
  const copyIcon = useMemo(() => {
    if (mode === 'read') return null;
    /** 复制按钮的配置 */
    if (copyIconProps === false || max === count) return null;
    const { Icon = CopyOutlined, tooltipText } = copyIconProps as IconConfig;
    return (
      <Tooltip key="copy" title={tooltipText}>
        {loadingCopy ? (
          <LoadingOutlined />
        ) : (
          <Icon
            className={classNames(`${prefixCls}-action-icon action-copy`, hashId)}
            onClick={async () => {
              setLoadingCopy(true);
              const row = formInstance?.getFieldValue(
                [listContext.listName, originName, field.name].filter((item) => item !== undefined).flat(1),
              );
              await action.add(row, count);
              setLoadingCopy(false);
            }}
          />
        )}
      </Tooltip>
    );
  }, [
    copyIconProps,
    max,
    count,
    loadingCopy,
    prefixCls,
    hashId,
    formInstance,
    listContext.listName,
    field.name,
    originName,
    action,
  ]);

  const deleteIcon = useMemo(() => {
    if (mode === 'read') return null;
    if (deleteIconProps === false || min === count) return null;
    const { Icon = DeleteOutlined, tooltipText } = deleteIconProps!;
    return (
      <Tooltip key="delete" title={tooltipText}>
        {loadingRemove ? (
          <LoadingOutlined />
        ) : (
          <Icon
            className={classNames(`${prefixCls}-action-icon action-remove`, hashId)}
            onClick={async () => {
              setLoadingRemove(true);
              await action.remove(field.name);
              if (!unmountedRef.current) {
                setLoadingRemove(false);
              }
            }}
          />
        )}
      </Tooltip>
    );
  }, [deleteIconProps, min, count, loadingRemove, prefixCls, hashId, action, field.name]);
  const upIcon = useMemo(() => {
    if (!arrowSort) {
      return null;
    }
    if (mode === 'read') return null;
    if (upIconProps === false) return null;
    const toIndex = index - 1;
    if (toIndex < 0) {
      return null;
    }
    const { Icon = ArrowUpOutlined, tooltipText } = upIconProps!;
    return (
      <Tooltip key="up" title={tooltipText}>
        <Icon
          className={classNames(`${prefixCls}-action-icon action-up`, hashId)}
          onClick={async () => {
            await action.move(index, toIndex);
          }}
        />
      </Tooltip>
    );
  }, [upIconProps, prefixCls, hashId, action, arrowSort]);

  const downIcon = useMemo(() => {
    if (!arrowSort) {
      return null;
    }
    if (mode === 'read') return null;
    if (downIconProps === false) return null;
    const toIndex = index + 1;
    if (toIndex >= count) {
      return null;
    }
    const { Icon = ArrowDownOutlined, tooltipText } = downIconProps!;
    return (
      <Tooltip key="down" title={tooltipText}>
        <Icon
          className={classNames(`${prefixCls}-action-icon action-down`, hashId)}
          onClick={async () => {
            await action.move(index, toIndex);
          }}
        />
      </Tooltip>
    );
  }, [upIconProps, prefixCls, hashId, action, arrowSort]);

  const defaultActionDom: React.ReactNode[] = useMemo(
    () => [copyIcon, deleteIcon, upIcon, downIcon].filter((item) => item !== null && item !== undefined),
    [copyIcon, deleteIcon, upIcon, downIcon],
  );

  const actions = actionRender?.(field, action, defaultActionDom, count) || defaultActionDom;

  const dom =
    actions.length > 0 && mode !== 'read' ? (
      <div
        className={classNames(
          `${prefixCls}-action`,
          {
            [`${prefixCls}-action-small`]: componentSize === 'small',
          },
          hashId,
        )}
      >
        {actions}
      </div>
    ) : null;

  const options = {
    name: rest.name,
    field,
    index,
    record: formInstance?.getFieldValue?.(
      [listContext.listName, originName, field.name].filter((item) => item !== undefined).flat(1),
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
          className={classNames(`${prefixCls}-container`, containerClassName, hashId)}
          style={{
            width: grid ? '100%' : undefined,
            ...containerStyle,
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
      className={classNames(`${prefixCls}-item`, hashId, {
        [`${prefixCls}-item-default`]: alwaysShowItemLabel === undefined,
        [`${prefixCls}-item-show-label`]: alwaysShowItemLabel,
      })}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        className={classNames(`${prefixCls}-container`, containerClassName, hashId)}
        style={{
          width: grid ? '100%' : undefined,
          ...containerStyle,
        }}
      >
        {itemContainer}
      </div>
      {dom}
    </div>
  );

  return (
    <FormListContext.Provider
      value={{
        ...field,
        listName: [listContext.listName, originName, field.name].filter((item) => item !== undefined).flat(1),
      }}
    >
      {contentDom}
    </FormListContext.Provider>
  );
};

export { ProFormListItem };
