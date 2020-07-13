import React from 'react';
import { Row, Col } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import FormRender from '../../FormRender';

export interface ProFormProps extends FormProps {
  // TODO
}

const ProForm: React.FC<ProFormProps> = props => {
  return (
    <div>
      <FormRender
        {...props}
        itemRender={(item: any) => {
          return React.cloneElement(item, {
            style: {
              width: '100%',
            },
          });
        }}
        itemsRender={items => {
          return (
            <Row gutter={16}>
              {items.map(item => (
                <Col span={6}>{item}</Col>
              ))}
            </Row>
          );
        }}
      />
    </div>
  );
};

export default ProForm;
