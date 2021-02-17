import type { ReactNode } from 'react';
import React, { useContext } from 'react';
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
  creatorButtonText?: ReactNode;
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
  creatorButtonText,
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
                if (typeof children === 'function') {
                  return (children as ChildrenFunction)(fields, action, meta);
                }
                return (
                  <div
                    style={{
                      width: 'max-content',
                    }}
                  >
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
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => action.add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        {creatorButtonText || '添加一行数据'}
                      </Button>
                    </Form.Item>
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
