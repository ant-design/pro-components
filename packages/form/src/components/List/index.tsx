import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { ProFormContext } from '@ant-design/pro-utils';
import { ConfigProvider, Form } from 'antd';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import type { FormListFieldData, FormListOperation, FormListProps } from 'antd/es/form/FormList';
import type { NamePath } from 'antd/es/form/interface';
import { noteOnce } from 'rc-util/lib/warning';
import type { ReactNode } from 'react';
import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { useGridHelpers } from '../../helpers';
import type { ProFormGridConfig } from '../../interface';
import './index.less';
import { ProFormListContainer } from './ListContainer';
import type { ChildrenItemFunction, FormListActionGuard, ProFromListCommonProps } from './ListItem';

const FormListContext = React.createContext<
  | (FormListFieldData & {
      listName: NamePath;
    })
  | Record<string, any>
>({});

export type FormListActionType<T = any> = FormListOperation & {
  get: (index: number) => T | undefined;
  getList: () => T[] | undefined;
};

export type ProFormListProps<T> = Omit<FormListProps, 'children'> &
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
  } & Pick<ProFormGridConfig, 'colProps' | 'rowProps'>;

function ProFormList<T>({
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
  colProps,
  rowProps,
  ...rest
}: ProFormListProps<T>) {
  const actionRefs = useRef<FormListOperation>();
  const context = useContext(ConfigProvider.ConfigContext);
  const listContext = useContext(FormListContext);
  const baseClassName = context.getPrefixCls('pro-form-list');

  const { ColWrapper, RowWrapper } = useGridHelpers({ colProps, rowProps });

  // 处理 list 的嵌套
  const name = useMemo(() => {
    if (listContext.name === undefined) {
      return [rest.name].flat(1);
    }
    return [listContext.name, rest.name].flat(1);
  }, [listContext.name, rest.name]);

  const proFormContext = useContext(ProFormContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useImperativeHandle(
    actionRef,
    () =>
      ({
        ...actionRefs.current,
        get: (index: number) => {
          return proFormContext.formRef!.current!.getFieldValue([...name, index]);
        },
        getList: () => proFormContext.formRef!.current!.getFieldValue([...name]),
      } as any),
    [name, proFormContext.formRef],
  );

  useEffect(() => {
    noteOnce(!!proFormContext.formRef, `ProFormList 必须要放到 ProForm 中,否则会造成行为异常。`);
    noteOnce(
      !!proFormContext.formRef,
      `Proformlist must be placed in ProForm, otherwise it will cause abnormal behavior.`,
    );
  }, [proFormContext.formRef]);

  if (!proFormContext.formRef) return null;

  return (
    <ColWrapper>
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
                <RowWrapper>
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
                  >
                    {children}
                  </ProFormListContainer>
                  <Form.ErrorList errors={meta.errors} />
                </RowWrapper>
              );
            }}
          </Form.List>
        </Form.Item>
      </div>
    </ColWrapper>
  );
}

export { FormListContext, ProFormList };
