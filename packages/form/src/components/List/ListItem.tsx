import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { ProProvider } from '@ant-design/pro-provider';
import type { ButtonProps, FormInstance } from 'antd';
import { Spin, Tooltip } from 'antd';
import type {
  FormListFieldData,
  FormListOperation,
  FormListProps,
} from 'antd/lib/form/FormList';
import toArray from 'rc-util/lib/Children/toArray';
import set from 'rc-util/lib/utils/set';
import type { CSSProperties, ReactNode } from 'react';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FormListContext } from '.';
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
  beforeAddRow?: (
    ...params: [...Parameters<FormListOperation['add']>, number]
  ) => boolean | Promise<boolean>;
  /**
   * @name 删除行之前的钩子，返回false，会阻止这个行为
   *
   * @example 阻止删除 beforeAddRow={()=> return false}
   */
  beforeRemoveRow?: (
    ...params: [...Parameters<FormListOperation['remove']>, number]
  ) => boolean | Promise<boolean>;
};

export type ProFromListCommonProps = {
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
  itemContainerRender?: (
    doms: ReactNode,
    listMeta: FormListListListMete,
  ) => ReactNode;
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
  onAfterAdd?: (
    ...params: [...Parameters<FormListOperation['add']>, number]
  ) => void;
  /**
   * 数据移除成功回调
   */
  onAfterRemove?: (
    ...params: [...Parameters<FormListOperation['remove']>, number]
  ) => void;

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
      <Tooltip title={tooltipText} key="copy">
        <Spin spinning={loadingCopy}>
          <Icon
            className={`${prefixCls}-action-icon action-copy ${hashId}`.trim()}
            onClick={async () => {
              setLoadingCopy(true);
              const row = formInstance?.getFieldValue(
                [listContext.listName, originName, field.name]
                  .filter((item) => item !== undefined)
                  .flat(1),
              );
              await action.add(row);
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
      <Tooltip title={tooltipText} key="delete">
        <Spin spinning={loadingRemove}>
          <Icon
            className={`${prefixCls}-action-icon action-remove ${hashId}`.trim()}
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
  }, [
    deleteIconProps,
    min,
    count,
    loadingRemove,
    prefixCls,
    hashId,
    action,
    field.name,
  ]);

  const defaultActionDom: React.ReactNode[] = useMemo(
    () =>
      [copyIcon, deleteIcon].filter(
        (item) => item !== null && item !== undefined,
      ),
    [copyIcon, deleteIcon],
  );

  const actions =
    actionRender?.(field, action, defaultActionDom, count) || defaultActionDom;

  const dom =
    actions.length > 0 && mode !== 'read' ? (
      <div className={`${prefixCls}-action ${hashId}`.trim()}>{actions}</div>
    ) : null;

  const options = {
    name: rest.name,
    field,
    index,
    record: formInstance?.getFieldValue?.(
      [listContext.listName, originName, field.name]
        .filter((item) => item !== undefined)
        .flat(1),
    ),
    fields,
    operation: action,
    meta,
  };

  const { grid } = useGridHelpers();

  const itemContainer =
    itemContainerRender?.(childrenArray, options) || childrenArray;

  const contentDom = itemRender?.(
    {
      listDom: (
        <div
          className={`${prefixCls}-container ${containerClassName || ''} ${
            hashId || ''
          }`.trim()}
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
      className={`${prefixCls}-item ${hashId} 
      ${alwaysShowItemLabel === undefined && `${prefixCls}-item-default`}
      ${alwaysShowItemLabel ? `${prefixCls}-item-show-label` : ''}`}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        className={`${prefixCls}-container ${
          containerClassName || ''
        } ${hashId}`.trim()}
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
