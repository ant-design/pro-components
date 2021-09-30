/** Uuid: 5277507c title: 表单中使用 */

/* eslint-disable no-console */
import React from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { Form, Button, Avatar } from 'antd';

export default () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: any) => {
    console.log('values', values);
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="checkbox-group" label="技术栈">
          <CheckCard.Group style={{ width: '100%' }}>
            <CheckCard
              title="Spring Boot"
              avatar={
                <Avatar
                  src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                  size="large"
                />
              }
              description="通过业界流行的技术栈来快速构建 Java 后端应用"
              value="SpringBoot"
            />
            <CheckCard
              title="SOFA Boot"
              avatar={
                <Avatar
                  src="https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg"
                  size="large"
                />
              }
              description="使用 SOFAStack 中间件来快速构建分布式后端应用"
              value="SOFABoot"
            />
            <CheckCard
              title="Node JS"
              avatar={
                <Avatar
                  src="https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg"
                  size="large"
                />
              }
              description="使用前后端统一的语言方案快速构建后端应用"
              value="NodeJS"
            />
          </CheckCard.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
