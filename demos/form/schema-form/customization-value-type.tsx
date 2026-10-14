import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm, ProProvider } from '@ant-design/pro-components';
import { Input, Tag } from 'antd';
import { useContext, useState } from 'react';

type FormValues = { tags?: string[] };

const columns: ProFormColumnsType<FormValues, 'tags'>[] = [
  {
    title: '标签',
    dataIndex: 'tags',
    valueType: 'tags',
  },
];

const TagEditor = ({
  value = [],
  onChange,
}: {
  value?: string[];
  onChange?: (value: string[]) => void;
}) => {
  const [draft, setDraft] = useState('');

  const addTag = () => {
    const tag = draft.trim();
    if (tag && !value.includes(tag)) onChange?.([...value, tag]);
    setDraft('');
  };

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {value.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <Input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onPressEnter={(event) => {
          event.preventDefault();
          addTag();
        }}
        onBlur={addTag}
        placeholder="输入标签后按回车"
      />
    </div>
  );
};

export default () => {
  const provider = useContext(ProProvider);
  const [submitted, setSubmitted] = useState('');

  return (
    <ProProvider.Provider
      value={{
        ...provider,
        valueTypeMap: {
          ...provider.valueTypeMap,
          tags: {
            formItemRender: (_text, props) => (
              <TagEditor {...props?.fieldProps} />
            ),
          },
        },
      }}
    >
      <div style={{ maxWidth: 480, padding: 16 }}>
        <BetaSchemaForm<FormValues, 'tags'>
          layoutType="Form"
          columns={columns}
          initialValues={{ tags: ['待处理'] }}
          onFinish={async (values) =>
            setSubmitted(JSON.stringify(values, null, 2))
          }
        />
        {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
      </div>
    </ProProvider.Provider>
  );
};
