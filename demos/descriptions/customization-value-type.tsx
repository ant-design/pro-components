import { ProDescriptions, ProProvider } from '@ant-design/pro-components';
import { Space, Tag } from 'antd';
import { useContext } from 'react';

type Project = { name: string; tags: string[] };

export default () => {
  const provider = useContext(ProProvider);

  return (
    <ProProvider.Provider
      value={{
        ...provider,
        valueTypeMap: {
          ...provider.valueTypeMap,
          tagList: {
            render: (tags: string[]) => (
              <Space size={4} wrap>
                {tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </Space>
            ),
          },
        },
      }}
    >
      <ProDescriptions<Project, 'tagList'>
        title="自定义值类型"
        dataSource={{ name: '组件库', tags: ['React', 'UI'] }}
        columns={[
          { title: '项目', dataIndex: 'name' },
          { title: '标签', dataIndex: 'tags', valueType: 'tagList' },
        ]}
      />
    </ProProvider.Provider>
  );
};
