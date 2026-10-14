import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm, ProProvider } from '@ant-design/pro-components';
import { useContext } from 'react';

type FormValues = { documentation?: string };

const columns: ProFormColumnsType<FormValues, 'documentationLink'>[] = [
  {
    title: '文档地址',
    dataIndex: 'documentation',
    valueType: 'documentationLink',
    readonly: true,
  },
];

export default () => {
  const provider = useContext(ProProvider);

  return (
    <ProProvider.Provider
      value={{
        ...provider,
        valueTypeMap: {
          ...provider.valueTypeMap,
          documentationLink: {
            render: (url) => (
              <a href={String(url)} target="_blank" rel="noreferrer">
                {String(url)}
              </a>
            ),
          },
        },
      }}
    >
      <div style={{ maxWidth: 480, padding: 16 }}>
        <BetaSchemaForm<FormValues, 'documentationLink'>
          layoutType="Form"
          columns={columns}
          initialValues={{ documentation: 'https://ant.design' }}
          submitter={false}
        />
      </div>
    </ProProvider.Provider>
  );
};
