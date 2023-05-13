import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { ProFormContext } from '@ant-design/pro-utils';
import type { ColProps } from 'antd';
import { ConfigProvider, Form } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type {
  FormListFieldData,
  FormListOperation,
  FormListProps,
} from 'antd/lib/form/FormList';
import type { NamePath } from 'antd/lib/form/interface';
import classNames from 'classnames';

import { noteOnce } from 'rc-util/lib/warning';
import type { ReactNode } from 'react';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { useGridHelpers } from '../../helpers';
import type { ProFormGridConfig } from '../../typing';
import { ProFormListContainer } from './ListContainer';
import type {
  ChildrenItemFunction,
  FormListActionGuard,
  ProFromListCommonProps,
} from './ListItem';
import { useStyle } from './style';

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
  } & Pick<ProFormGridConfig, 'colProps' | 'rowProps'>;

function ProFormList<T>(props: ProFormListProps<T>) {
  const actionRefs = useRef<FormListOperation>();
  const context = useContext(ConfigProvider.ConfigContext);
  const listContext = useContext(FormListContext);
  const baseClassName = context.getPrefixCls('pro-form-list');

  // Internationalization
  const intl = useIntl();

  const {
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
      tooltipText: intl.getMessage('copyThisLine', '复制此行'),
    },
    children,
    deleteIconProps = {
      Icon: DeleteOutlined,
      tooltipText: intl.getMessage('deleteThisLine', '删除此行'),
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
    ...rest
  } = props;

  const { ColWrapper, RowWrapper } = useGridHelpers({ colProps, rowProps });

  const proFormContext = useContext(ProFormContext);

  // 处理 list 的嵌套
  const name = useMemo(() => {
    if (listContext.name === undefined) {
      return [rest.name].flat(1);
    }
    return [listContext.name, rest.name].flat(1);
  }, [listContext.name, rest.name]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useImperativeHandle(
    actionRef,
    () =>
      ({
        ...actionRefs.current,
        get: (index: number) => {
          return proFormContext.formRef!.current!.getFieldValue([
            ...name,
            index,
          ]);
        },
        getList: () =>
          proFormContext.formRef!.current!.getFieldValue([...name]),
      } as any),
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

  const { wrapSSR, hashId } = useStyle(baseClassName);

  if (!proFormContext.formRef) return null;

  return wrapSSR(
    <ColWrapper>
      <div className={classNames(baseClassName, hashId)} style={style}>
        <Form.Item
          label={label}
          prefixCls={prefixCls}
          tooltip={tooltip}
          style={style}
          required={rules?.some((rule) => rule.required)}
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
                    onAfterAdd={(defaultValue, insertIndex, count) => {
                      if (isValidateList) {
                        proFormContext.formRef!.current!.validateFields([name]);
                      }
                      onAfterAdd?.(defaultValue, insertIndex, count);
                    }}
                    onAfterRemove={(index, count) => {
                      if (isValidateList) {
                        if (count === 0) {
                          proFormContext.formRef!.current!.validateFields([
                            name,
                          ]);
                        }
                      }
                      onAfterRemove?.(index, count);
                    }}
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
    </ColWrapper>,
  );
}

export { FormListContext, ProFormList };
