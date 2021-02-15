import type { ReactNode } from 'react';
import React, { useContext } from 'react';
import { Button, Form, Space, Tooltip, ConfigProvider } from 'antd';
import type { FormListFieldData, FormListOperation, FormListProps } from 'antd/lib/form/FormList';
import { DeleteOutlined, PlusOutlined, CopyOutlined } from '@ant-design/icons';

import './index.less';

const FormListContext = React.createContext<FormListFieldData | Record<string, any>>({});

export type ProFormListProps = Omit<FormListProps, 'children'> & {
  creatorButtonText?: ReactNode;
  actionRender?: (
    field: FormListFieldData,
    action: FormListOperation,
    defaultActionDom: ReactNode,
  ) => ReactNode[];
  children: ReactNode;
};

const ProFormList: React.FC<ProFormListProps> = ({
  children,
  actionRender,
  creatorButtonText,
  ...rest
}) => {
  const context = useContext(ConfigProvider.ConfigContext);
  return (
    <div className={context.getPrefixCls('pro-form-list')}>
      <Form.List {...rest}>
        {(fields, action) => {
          return (
            <>
              {fields.map((field) => {
                const defaultActionDom = (
                  <>
                    <Tooltip title="复制此行">
                      <CopyOutlined onClick={() => {}} style={{ marginRight: 8 }} />
                    </Tooltip>
                    <Tooltip title="删除此行">
                      <DeleteOutlined onClick={() => action.remove(field.name)} />{' '}
                    </Tooltip>
                  </>
                );
                const dom = actionRender?.(field, action, defaultActionDom) || defaultActionDom;
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
                <Button type="dashed" onClick={() => action.add()} block icon={<PlusOutlined />}>
                  {creatorButtonText || '添加一行数据'}
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </div>
  );
};

export { FormListContext };

export default ProFormList;
