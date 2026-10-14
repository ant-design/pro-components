import {
  LightFilter,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <LightFilter
        onFinish={async (values) => {
          setResult(JSON.stringify(values, null, 2));
        }}
      >
        <ProFormFieldSet
          name="condition"
          label="筛选条件"
          transform={([operator, keyword]) => ({
            filter: { operator, keyword },
          })}
        >
          <ProFormSelect
            options={[
              { value: 'contains', label: '包含' },
              { value: 'equals', label: '等于' },
            ]}
          />
          <ProFormText placeholder="输入关键词" />
        </ProFormFieldSet>
      </LightFilter>
      {result && <pre aria-label="筛选结果">{result}</pre>}
    </div>
  );
};
