import type { ReactNode } from 'react';
import React, { useContext } from 'react';
import type { ButtonProps } from 'antd';
import omit from 'omit.js';
import { Button, Form, Space, Tooltip, ConfigProvider } from 'antd';
import type { FormListFieldData, FormListOperation, FormListProps } from 'antd/lib/form/FormList';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import { DeleteOutlined, PlusOutlined, CopyOutlined } from '@ant-design/icons';

import './index.less';

const FormListContext = React.createContext<FormListFieldData | Record<string, any>>({});

type ChildrenFunction = (
  fields: FormListFieldData[],
  operation: FormListOperation,
  meta: {
    errors: React.ReactNode[];
  },
) => React.ReactNode;

export type ProFormListProps = Omit<FormListProps, 'children'> & {
  creatorButtonProps?: ButtonProps & {
    creatorButtonText?: ReactNode;
    position?: 'top' | 'bottom';
  };
  label?: ReactNode;
  tooltip?: LabelTooltipType;
  actionRender?: (
    field: FormListFieldData,
    action: FormListOperation,
    defaultActionDom: ReactNode,
  ) => ReactNode[];
  children: ReactNode | ChildrenFunction;
};

const ProFormList: React.FC<ProFormListProps> = ({
  children,
  actionRender,
  creatorButtonProps,
  label,
  tooltip,
  ...rest
}) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-list');
  return (
    <Form.Item label={label} tooltip={tooltip} shouldUpdate>
      {({ getFieldValue }) => {
        return (
          <div className={baseClassName}>
            <Form.List {...rest}>
              {(fields, action, meta) => {
                const creatorButton = (
                  <Form.Item>
                    <Button
                      type="dashed"
                      block
                      icon={<PlusOutlined />}
                      {...omit(creatorButtonProps || {}, ['position'])}
                      onClick={() => action.add()}
                    >
                      {creatorButtonProps?.creatorButtonText || '添加一行数据'}
                    </Button>
                  </Form.Item>
                );
                if (typeof children === 'function') {
                  return (children as ChildrenFunction)(fields, action, meta);
                }
                return (
                  <div
                    style={{
                      width: 'max-content',
                    }}
                  >
                    {creatorButtonProps?.position === 'top' && creatorButton}
                    {fields.map((field) => {
                      const defaultActionDom = (
                        <div
                          style={{
                            height: 14,
                          }}
                        >
                          <Tooltip title="复制此行">
                            <CopyOutlined
                              className={`${baseClassName}-action-icon`}
                              onClick={() => {
                                action.add(getFieldValue([rest.name, field.key].flat(1)));
                              }}
                            />
                          </Tooltip>
                          <Tooltip title="删除此行">
                            <DeleteOutlined
                              className={`${baseClassName}-action-icon`}
                              onClick={() => action.remove(field.name)}
                            />
                          </Tooltip>
                        </div>
                      );
                      const dom =
                        actionRender?.(field, action, defaultActionDom) || defaultActionDom;
                      return (
                        <FormListContext.Provider key={field.name} value={field}>
                          <Space
                            style={{
                              display: 'flex',
                            }}
                          >
                            {children}
                            {dom}
                          </Space>
                        </FormListContext.Provider>
                      );
                    })}
                    {creatorButtonProps?.position !== 'top' && creatorButton}
                  </div>
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
