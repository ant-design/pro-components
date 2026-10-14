import { ProForm, ProFormTreeSelect } from '@ant-design/pro-components';
import { Button, Space, Typography } from 'antd';
import { useState } from 'react';

export default () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <ProForm submitter={false}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ProFormTreeSelect
          name="team"
          label="受控搜索词"
          width="sm"
          fieldProps={{
            showSearch: true,
            searchValue,
            onSearch: setSearchValue,
            treeData: [
              {
                title: '研发',
                value: 'dev',
                children: [
                  { title: '前端', value: 'frontend' },
                  { title: '后端', value: 'backend' },
                ],
              },
            ],
          }}
        />
        <Button onClick={() => setSearchValue('前端')}>搜索前端</Button>
        <Typography.Text code>
          searchValue: {searchValue || '（空）'}
        </Typography.Text>
      </Space>
    </ProForm>
  );
};
