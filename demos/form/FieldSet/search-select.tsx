import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

export default () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div style={{ padding: 24 }}>

    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="Edit"
        unCheckedChildren="Read Only"
        onChange={setReadonly}
      />
      <ProForm readonly={readonly}>
        <ProForm.Group>
          <ProFormSelect.SearchSelect
            name="userQuery"
            label="Query Selector - request"
            fieldProps={{
              labelInValue: true,
              style: {
                minWidth: 140,
              },
            }}
            debounceTime={300}
            request={async ({ keyWords = '' }) => {
              return [
                { label: 'All', value: 'all' },
                { label: 'Unresolved', value: 'open' },
                { label: 'Unresolved (Assigned)', value: 'assignees' },
                { label: 'Resolved', value: 'closed' },
                { label: 'In Progress', value: 'processing' },
              ].filter(({ value, label }) => {
                return value.includes(keyWords) || label.includes(keyWords);
              });
            }}
          />
          <ProFormSelect.SearchSelect
            name="userQuery2"
            label="Query Selector - valueEnum"
            fieldProps={{
              style: {
                minWidth: 140,
              },
            }}
            valueEnum={{
              all: { text: 'All', status: 'Default' },
              open: {
                text: 'Unresolved',
                status: 'Error',
              },
              closed: {
                text: 'Resolved',
                status: 'Success',
              },
              processing: {
                text: 'In Progress',
                status: 'Processing',
              },
            }}
          />
          <ProFormSelect.SearchSelect
            name="userQuery3"
            label="Query Selector - options"
            fieldProps={{
              labelInValue: false,
              style: {
                minWidth: 140,
              },
            }}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Unresolved', value: 'open' },
              { label: 'Resolved', value: 'closed' },
              { label: 'In Progress', value: 'processing' },
            ]}
          />
        </ProForm.Group>
      </ProForm>
    </div>
  
    </div>
  );
};
