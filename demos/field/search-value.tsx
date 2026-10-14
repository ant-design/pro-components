import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { Button, Space, Typography } from 'antd';
import { useState } from 'react';

export default () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <ProForm submitter={false}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <ProFormSelect
          name="service"
          label="受控搜索值"
          width="sm"
          options={[
            { label: 'Alpha', value: 'alpha' },
            { label: 'Beta', value: 'beta' },
          ]}
          fieldProps={{
            showSearch: true,
            searchValue,
            onSearch: setSearchValue,
          }}
        />
        <Button onClick={() => setSearchValue('Al')}>搜索 Alpha</Button>
        <Typography.Text code>
          searchValue: {searchValue || '（空）'}
        </Typography.Text>
      </Space>
    </ProForm>
  );
};
