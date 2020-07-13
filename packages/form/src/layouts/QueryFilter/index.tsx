import React from 'react';
import { Row, Col, Form } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import FormRender from '../../FormRender';
import Submiter from './Submiter';

export interface ProFormProps extends FormProps {
  // TODO
}

const ProForm: React.FC<ProFormProps> = props => {
  const [form] = Form.useForm();
  const [collapse, setCollapse] = React.useState<boolean>(false);
  return (
    <div>
      <FormRender
        {...props}
        form={form}
        itemRender={(item: any) => {
          return React.cloneElement(item, {
            style: {
              width: '100%',
            },
          });
        }}
        itemsRender={items => {
          return (
            <Row gutter={16} justify="start">
              {items.map(item => (
                <Col span={6}>{item}</Col>
              ))}
              <Col span={6}>
                <Submiter
                  form={form}
                  submit={() => {
                    // TODO
                  }}
                  collapse={collapse}
                  setCollapse={setCollapse}
                  showCollapseButton
                  searchConfig={{
                    searchText: '查询',
                    resetText: '重置',
                  }}
                />
              </Col>
            </Row>
          );
        }}
      />
    </div>
  );
};

export default ProForm;
