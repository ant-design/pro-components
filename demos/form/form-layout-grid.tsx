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
} from '@xxlabs/pro-components';
import { Col, message, Row, Space } from 'antd';
import type { FormLayout } from 'antd/es/form/Form';
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
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(LAYOUT_TYPE_HORIZONTAL);

  const [grid, setGrid] = useState(true);

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      grid={grid}
      layout={formLayoutType}
      params={{}}
      request={async () => {
        await waitTime(100);
        return {
          name: 'Ant Design Co., Ltd.',
          useMode: 'chapter',
        };
      }}
      rowProps={{
        gutter: [16, formLayoutType === 'inline' ? 16 : 0],
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
        colProps={{
          span: 20,
        }}
        fieldProps={{
          value: formLayoutType,
          onChange: (e) => setFormLayoutType(e.target.value),
        }}
        label="Label Layout"
        options={['horizontal', 'vertical', 'inline']}
        radioType="button"
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
      <ProFormText label="Title" name="name" placeholder="Please enter a name" tooltip="Up to 24 characters" />
      <ProFormText colProps={{ md: 12, xl: 8 }} label="Name" name="company" />
      <ProFormDigit colProps={{ md: 12, xl: 8 }} label="Phone" name="phone" />
      <ProFormText colProps={{ md: 12, xl: 8 }} label="Email" name="email" />
      <ProFormTextArea colProps={{ span: 24 }} label="Detailed Work Address or Home Address" name="address" />
      <ProFormDatePicker colProps={{ xl: 8, md: 12 }} label="Entry Date" name="date" />
      <ProFormDateRangePicker colProps={{ xl: 8, md: 12 }} label="Work Period" name="dateRange" />
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
