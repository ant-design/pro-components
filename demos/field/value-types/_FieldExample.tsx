import type { ProFieldFCMode } from '@ant-design/pro-components';
import { ProField } from '@ant-design/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

type Props = {
  initialValue: any;
  valueType?: any;
  [key: string]: any;
};

export default function FieldExample({ initialValue, ...props }: Props) {
  const [mode, setMode] = useState<ProFieldFCMode>('read');
  const [value, setValue] = useState(initialValue);
  return (
    <div style={{ maxWidth: '100%', overflowWrap: 'anywhere' }}>
      <Segmented
        value={mode}
        onChange={(next) => setMode(next as ProFieldFCMode)}
        options={[
          { label: '只读', value: 'read' },
          { label: '编辑', value: 'edit' },
        ]}
      />
      <div style={{ marginBlockStart: 16, maxWidth: '100%' }}>
        <ProField
          text={value}
          value={value}
          onChange={setValue}
          mode={mode}
          {...props}
        />
      </div>
    </div>
  );
}
