import { ProTable } from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';
import { columns, rows } from './data';

export default () => {
  const [value, setValue] = useState<boolean>(true);
  return (
    <div>
      <div style={{ marginBlockEnd: 16 }}>
        <Switch
          checked={value}
          onChange={setValue}
          checkedChildren="有边框"
          unCheckedChildren="无边框"
        />
      </div>
      <ProTable
        rowKey="id"
        dataSource={rows}
        columns={columns}
        search={false}
        options={false}
        pagination={false}
        bordered={value}
      />
    </div>
  );
};
