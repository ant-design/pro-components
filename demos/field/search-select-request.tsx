import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { Typography } from 'antd';
import { useState } from 'react';

const options = ['Alpha', 'Beta', 'Gamma', 'Delta'];

export default () => {
  const [keyword, setKeyword] = useState('（尚未搜索）');
  return (
    <ProForm submitter={false}>
      <ProFormSelect.SearchSelect
        name="keyword"
        label="远程搜索"
        debounceTime={100}
        request={async ({ keyWords }) =>
          options
            .filter((item) =>
              item.toLowerCase().includes((keyWords ?? '').toLowerCase()),
            )
            .map((item) => ({ label: item, value: item }))
        }
        fieldProps={{
          showSearch: { onSearch: (value) => setKeyword(value || '（空）') },
        }}
      />
      <Typography.Text code>onSearch: {keyword}</Typography.Text>
    </ProForm>
  );
};
