import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Col, Row, Space, message } from 'antd';
import type { FormLayout } from 'antd/lib/form/Form';
import { useState } from 'react';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(
    LAYOUT_TYPE_HORIZONTAL,
  );

  const [grid, setGrid] = useState(true);

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      layout={formLayoutType}
      grid={grid}
      rowProps={{
        gutter: [16, formLayoutType === 'inline' ? 16 : 0],
      }}
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
        label="Label Layout"
        radioType="button"
        fieldProps={{
          value: formLayoutType,
          onChange: (e) => setFormLayoutType(e.target.value),
        }}
        colProps={{
          span: 20,
        }}
        options={['horizontal', 'vertical', 'inline']}
      />
      <ProFormSwitch
        colProps={{
          span: 4,
        }}
        fieldProps={{
          onChange: setGrid,
        }}
        initialValue={true}
        label="Grid Switch"
        name="grid"
      />
      <ProFormText
        name="name"
        label="Title"
        tooltip="Up to 24 characters"
        placeholder="Please enter a name"
      />
      <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="Name" />
      <ProFormDigit colProps={{ md: 12, xl: 8 }} name="phone" label="Phone" />
      <ProFormText colProps={{ md: 12, xl: 8 }} name="email" label="Email" />
      <ProFormTextArea
        colProps={{ span: 24 }}
        name="address"
        label="Detailed Work Address or Home Address"
      />
      <ProFormDatePicker
        colProps={{ xl: 8, md: 12 }}
        label="Entry Date"
        name="date"
      />
      <ProFormDateRangePicker
        colProps={{ xl: 8, md: 12 }}
        label="Work Period"
        name="dateRange"
      />
      <ProFormSelect
        colProps={{ xl: 8, md: 12 }}
        label="Position"
        name="level"
        valueEnum={{
          1: 'Front End',
          2: 'Back End',
          3: 'Full Stack',
        }}
      />
    </ProForm>
  );
};
