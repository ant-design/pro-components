import { ProForm, ProFormRadio, ProFormText } from '@xxlabs/pro-components';
import { Col, Row, Space, message } from 'antd';
import { useState } from 'react';

type LayoutType = Parameters<typeof ProForm>[0]['layout'];
const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(LAYOUT_TYPE_HORIZONTAL);

  const formItemLayout =
    formLayoutType === LAYOUT_TYPE_HORIZONTAL
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      {...formItemLayout}
      layout={formLayoutType}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: 'Ant Design Co., Ltd.',
          useMode: 'chapter',
        };
      }}
      submitter={{
        render: (props, doms) => {
          return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
            <Row>
              <Col offset={4} span={14}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          ) : (
            doms
          );
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('Submission successful');
      }}
    >
      <ProFormRadio.Group
        fieldProps={{
          value: formLayoutType,
          onChange: (e) => setFormLayoutType(e.target.value),
        }}
        label="Label Layout"
        options={['horizontal', 'vertical', 'inline']}
        radioType="button"
        style={{
          margin: 16,
        }}
      />
      <ProFormText
        label="Contract Customer Name"
        name="name"
        placeholder="Please enter a name"
        tooltip="Up to 24 characters"
        width="md"
      />
      <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
      <ProFormText label="Contract Name" name={['contract', 'name']} placeholder="Please enter a name" width="md" />
    </ProForm>
  );
};
