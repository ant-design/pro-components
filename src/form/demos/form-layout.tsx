import { ProForm, ProFormRadio, ProFormText } from '../../components';
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
  const [formLayoutType, setFormLayoutType] = useState<LayoutType>(
    LAYOUT_TYPE_HORIZONTAL,
  );

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
      submitter={{
        render: (props, doms) => {
          return formLayoutType === LAYOUT_TYPE_HORIZONTAL ? (
            <Row>
              <Col span={14} offset={4}>
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
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: 'Ant Design Co., Ltd.',
          useMode: 'chapter',
        };
      }}
    >
      <ProFormRadio.Group
        style={{
          margin: 16,
        }}
        label="Label Layout"
        radioType="button"
        fieldProps={{
          value: formLayoutType,
          onChange: (e) => setFormLayoutType(e.target.value),
        }}
        options={['horizontal', 'vertical', 'inline']}
      />
      <ProFormText
        width="md"
        name="name"
        label="Contract Customer Name"
        tooltip="Up to 24 characters"
        placeholder="Please enter a name"
      />
      <ProFormText
        width="md"
        name="company"
        label="Our Company Name"
        placeholder="Please enter a name"
      />
      <ProFormText
        name={['contract', 'name']}
        width="md"
        label="Contract Name"
        placeholder="Please enter a name"
      />
    </ProForm>
  );
};
