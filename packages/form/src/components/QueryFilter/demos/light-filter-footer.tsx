import React from 'react';
import { LightFilter, ProFormText } from '@ant-design/pro-form';
import { Button, Radio, Space } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';

export default () => {
  const [size, setSize] = React.useState<SizeType>('middle');
  return (
    <div>
      <Radio.Group
        value={size}
        onChange={(e) => {
          setSize(e.target.value);
        }}
      >
        <Radio.Button value="middle">Middle</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>

      <br />
      <br />

      <Space direction="vertical">
        <LightFilter
          size={size}
          initialValues={{
            name: 'Jack2',
          }}
        >
          <ProFormText
            name="name"
            label="名称"
            footer={{
              content: () => (
                <Button onClick={() => console.log('自定义footer')}>自定义footer</Button>
              ),
            }}
          />
        </LightFilter>

        <LightFilter
          size={size}
          initialValues={{
            name: 'Jack2',
          }}
        >
          <ProFormText name="name" label="名称" footer={null} />
        </LightFilter>

        <LightFilter
          size={size}
          initialValues={{
            name: 'Jack2',
          }}
          collapse
          collapseLabel="footer为null"
          footer={null}
        >
          <ProFormText name="name" label="名称" />
        </LightFilter>

        <LightFilter
          size={size}
          initialValues={{
            name: 'Jack2',
          }}
          collapse
          collapseLabel="自定义footer"
          footer={{
            content: () => (
              <Button onClick={() => console.log('自定义footer')}>自定义footer</Button>
            ),
          }}
        >
          <ProFormText name="name" label="名称" />
        </LightFilter>
      </Space>
    </div>
  );
};
