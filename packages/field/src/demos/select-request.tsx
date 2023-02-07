import { ProForm, ProFormSelect } from '@ant-design/pro-components';

function App() {
  return (
    <div className="App">
      <ProForm>
        <ProFormSelect
          showSearch
          name="select"
          request={async () => {
            console.log('请求1');
            return [{ label: '选项1', value: '1' }];
          }}
        />
      </ProForm>
      <ProForm>
        <ProFormSelect
          showSearch
          name="select"
          request={async () => {
            console.log('请求2');
            return [{ label: '选项2', value: '2' }];
          }}
        />
      </ProForm>
    </div>
  );
}

export default App;
