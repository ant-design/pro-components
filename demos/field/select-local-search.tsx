import { ProForm, ProFormSelect } from '@ant-design/pro-components';

function App() {
  return (
    <div className="App">
      <ProForm>
        <ProFormSelect
          showSearch
          name="remote"
          label="远程搜索（默认）"
          request={async ({ keyWords }: any) => {
            console.log('remote request called:', keyWords);
            return [
              { label: 'Apple', value: 'apple' },
              { label: 'Banana', value: 'banana' },
              { label: 'Orange', value: 'orange' },
            ].filter((item) => item.label.includes(keyWords || ''));
          }}
        />
        <ProFormSelect
          showSearch
          name="local"
          label="本地搜索（request 只拉取一次）"
          fetchDataOnSearch={false}
          request={async () => [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ]}
        />
      </ProForm>
    </div>
  );
}

export default () => (
  <div style={{ padding: 24 }}>
    <App />
  </div>
);
