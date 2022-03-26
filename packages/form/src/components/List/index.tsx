import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { ProFormContext } from '@ant-design/pro-utils';
import { ConfigProvider, Form } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { FormListFieldData, FormListOperation, FormListProps } from 'antd/lib/form/FormList';
import type { NamePath } from 'antd/lib/form/interface';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import React, { useContext, useImperativeHandle, useMemo, useRef } from 'react';
import './index.less';
import { noteOnce } from 'rc-util/lib/warning';
import { useGridHelpers } from '../../helpers';
import type { ProFormGridConfig } from '../../interface';
import type { ChildrenItemFunction, FormListActionGuard, ProFromListCommonProps } from './ListItem';
import { ProFormListContainer } from './ListContainer';

const FormListContext = React.createContext<
  | (FormListFieldData & {
      listName: NamePath;
    })
  | Record<string, any>
>({});

export type ProFormListProps = Omit<FormListProps, 'children'> &
  ProFromListCommonProps & {
    label?: ReactNode;
    tooltip?: LabelTooltipType;
    actionGuard?: FormListActionGuard;
    children?: ReactNode | ChildrenItemFunction;
    /**
     * @name 获取到 list 操作实例
     * @description 可用删除，新增，移动等操作
     *
     * @example  actionRef?.current.add?.({},1);
     * @example  actionRef?.current.remove?.(1);
     * @example  actionRef?.current.move?.(1,2);
     */
    actionRef?: React.MutableRefObject<FormListOperation | undefined>;
    /** 放在div上面的属性 */
    style?: React.CSSProperties;
  } & Pick<ProFormGridConfig, 'colProps' | 'rowProps'>;

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
  colProps,
  rowProps,
  ...rest
}) => {
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
};

export { FormListContext, ProFormList };
