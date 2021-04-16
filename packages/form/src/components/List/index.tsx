import type { ReactNode } from 'react';
import React, { useContext, useMemo } from 'react';
import type { ButtonProps } from 'antd';
import omit from 'omit.js';
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

type ChildrenFunction = (
  fields: FormListFieldData[],
  operation: FormListOperation,
  meta: {
    errors: React.ReactNode[];
  },
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
  children: ReactNode | ChildrenFunction;
  /** 自定义Item，可以用来将 action 放到别的地方 */
  itemRender?: (
    doms: { listDom: ReactNode; action: ReactNode },
    listMeta: {
      field: FormListFieldData;
      fields: FormListFieldData[];
      operation: FormListOperation;
      record: Record<string, any>;
      meta: {
        errors: React.ReactNode[];
      };
    },
  ) => ReactNode;
  copyIconProps?: IconConfig | false;
  deleteIconProps?: IconConfig | false;
};

const ProFormList: React.FC<ProFormListProps> = ({
  children,
  actionRender,
  creatorButtonProps,
  label,
  tooltip,
  creatorRecord,
  itemRender,
  rules,
  copyIconProps = {
    Icon: CopyOutlined,
    tooltipText: '复制此行',
  },
  deleteIconProps = {
    Icon: DeleteOutlined,
    tooltipText: '删除此行',
  },
  ...rest
}) => {
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
  return (
    <Form.Item
      label={label}
      tooltip={tooltip}
      rules={rules}
      shouldUpdate={(prevValues, nextValues) => {
        return get(prevValues, name) !== get(nextValues, name);
      }}
    >
      {({ getFieldValue }) => {
        return (
          <div className={baseClassName}>
            <Form.List rules={rules} {...rest} name={name}>
              {(fields, action, meta) => {
                const creatorButton = creatorButtonProps !== false && (
                  <Button
                    className={`${baseClassName}-creator-button-${
                      creatorButtonProps?.position || 'bottom'
                    }`}
                    type="dashed"
                    block
                    icon={<PlusOutlined />}
                    {...omit(creatorButtonProps || {}, ['position', 'creatorButtonText'])}
                    onClick={() => {
                      let index;
                      if (creatorButtonProps?.position === 'top') index = 0;
                      action.add(runFunction(creatorRecord), index);
                    }}
                  >
                    {creatorButtonProps?.creatorButtonText || '添加一行数据'}
                  </Button>
                );
                if (typeof children === 'function') {
                  return (children as ChildrenFunction)(fields, action, meta);
                }
                return (
                  <>
                    <div
                      style={{
                        width: 'max-content',
                        maxWidth: '100%',
                      }}
                    >
                      {creatorButtonProps !== false &&
                        creatorButtonProps?.position === 'top' &&
                        creatorButton}
                      {fields.map((field) => {
                        const defaultActionDom: React.ReactNode[] = [];
                        if (copyIconProps) {
                          const { Icon = CopyOutlined, tooltipText } = copyIconProps as IconConfig;
                          defaultActionDom.push(
                            <Tooltip title={tooltipText} key="copy">
                              <Icon
                                className={`${baseClassName}-action-icon`}
                                onClick={() => {
                                  action.add(
                                    getFieldValue(
                                      [listContext.listName, rest.name, field.name]
                                        .filter((item) => item !== undefined)
                                        .flat(1),
                                    ),
                                  );
                                }}
                              />
                            </Tooltip>,
                          );
                        }
                        if (deleteIconProps) {
                          const { Icon = DeleteOutlined, tooltipText } = deleteIconProps;
                          defaultActionDom.push(
                            <Tooltip title={tooltipText} key="delete">
                              <Icon
                                className={`${baseClassName}-action-icon`}
                                onClick={() => action.remove(field.name)}
                              />
                            </Tooltip>,
                          );
                        }

                        const actions =
                          actionRender?.(field, action, defaultActionDom) || defaultActionDom;

                        const dom =
                          actions.length > 0 ? (
                            <div className={`${baseClassName}-action`}>{actions}</div>
                          ) : null;

                        const contentDom = itemRender?.(
                          {
                            listDom: <div className={`${baseClassName}-container`}>{children}</div>,
                            action: dom,
                          },
                          {
                            field,
                            record: getFieldValue(
                              [listContext.listName, rest.name, field.name]
                                .filter((item) => item !== undefined)
                                .flat(1),
                            ),
                            fields,
                            operation: action,
                            meta,
                          },
                        ) || (
                          <div
                            className={`${baseClassName}-item`}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-end',
                            }}
                          >
                            <div className={`${baseClassName}-container`}>{children}</div>
                            {dom}
                          </div>
                        );

                        return (
                          <FormListContext.Provider
                            key={field.name}
                            value={{
                              ...field,
                              listName: [name, field.name],
                            }}
                          >
                            {contentDom}
                          </FormListContext.Provider>
                        );
                      })}
                      {creatorButtonProps !== false &&
                        creatorButtonProps?.position !== 'top' &&
                        creatorButton}
                    </div>
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
