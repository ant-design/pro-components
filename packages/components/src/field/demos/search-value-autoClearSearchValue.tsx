import { ProFormSelect } from '@ant-design/pro-components';

export default function App() {
  return (
    <div>
      <ProFormSelect
        name="name"
        placeholder="请输入搜索关键字"
        allowClear
        width={330}
        secondary
        mode="tags"
        options={
          [
            {
              v: 'v1',
              l: 'l1',
            },
            {
              v: 'v2',
              l: 'l3',
            },
            {
              v: 'v4',
              l: 'l5',
            },
          ] as any
        }
        fieldProps={{
          fieldNames: {
            value: 'v',
            label: 'l',
            options: 'options',
          },
          showSearch: true, // 使单选模式可搜索
          autoClearSearchValue: true,
        }}
      />
    </div>
  );
}
