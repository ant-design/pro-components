import { LightFilter, ProFormText } from '@ant-design/pro-components';
import { Button, Radio, Space } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

const Demo = () => {
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

      <Space orientation="vertical">
        <LightFilter
          size={size}
          initialValues={{
            name: 'Jack2',
          }}
        >
          <ProFormText
            name="name"
            label="名称"
            footerRender={(_, onClear) => (
              <Button
                onClick={() => {
                  onClear?.();
                }}
              >
                自定义footer
              </Button>
            )}
          />
        </LightFilter>

        <LightFilter
          size={size}
          initialValues={{
            name: 'Jack2',
          }}
        >
          <ProFormText name="name" label="名称" footerRender={false} />
        </LightFilter>

        <LightFilter
          size={size}
          initialValues={{
            name: 'Jack2',
          }}
          collapse
          collapseLabel="footer为false"
          footerRender={false}
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
          footerRender={(_, onClear) => (
            <Button
              onClick={() => {
                onClear?.();
              }}
            >
              自定义footer
            </Button>
          )}
        >
          <ProFormText name="name" label="名称" />
        </LightFilter>
      </Space>
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
