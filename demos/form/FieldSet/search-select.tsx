import { ProForm, ProFormSelect } from '@xxlabs/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';

export default () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        checked={readonly}
        checkedChildren="Edit"
        style={{
          marginBlockEnd: 16,
        }}
        unCheckedChildren="Read Only"
        onChange={setReadonly}
      />
      <ProForm readonly={readonly}>
        <ProForm.Group>
          <ProFormSelect.SearchSelect
            debounceTime={300}
            fieldProps={{
              labelInValue: true,
              style: {
                minWidth: 140,
              },
            }}
            label="Query Selector - request"
            name="userQuery"
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
            fieldProps={{
              style: {
                minWidth: 140,
              },
            }}
            label="Query Selector - valueEnum"
            name="userQuery2"
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
            fieldProps={{
              labelInValue: false,
              style: {
                minWidth: 140,
              },
            }}
            label="Query Selector - options"
            name="userQuery3"
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
  );
};
