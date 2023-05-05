import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Col, message, Row, Space } from 'antd';
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
        message.success('提交成功');
      }}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: '蚂蚁设计有限公司',
          useMode: 'chapter',
        };
      }}
    >
      <ProFormRadio.Group
        style={{
          margin: 16,
        }}
        label="标签布局"
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
        label="签约客户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText
        width="md"
        name="company"
        label="我方公司名称"
        placeholder="请输入名称"
      />
      <ProFormText
        name={['contract', 'name']}
        width="md"
        label="合同名称"
        placeholder="请输入名称"
      />
    </ProForm>
  );
};
