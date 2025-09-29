import { LightFilter, ProFormText } from '@xxlabs/pro-components';
import { Button, Radio, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import React from 'react';

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
          initialValues={{
            name: 'Jack2',
          }}
          size={size}
        >
          <ProFormText
            footerRender={(_, onClear) => (
              <Button
                onClick={() => {
                  onClear?.();
                }}
              >
                自定义footer
              </Button>
            )}
            label="名称"
            name="name"
          />
        </LightFilter>

        <LightFilter
          initialValues={{
            name: 'Jack2',
          }}
          size={size}
        >
          <ProFormText footerRender={false} label="名称" name="name" />
        </LightFilter>

        <LightFilter
          collapse
          collapseLabel="footer为false"
          footerRender={false}
          initialValues={{
            name: 'Jack2',
          }}
          size={size}
        >
          <ProFormText label="名称" name="name" />
        </LightFilter>

        <LightFilter
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
          initialValues={{
            name: 'Jack2',
          }}
          size={size}
        >
          <ProFormText label="名称" name="name" />
        </LightFilter>
      </Space>
    </div>
  );
};
