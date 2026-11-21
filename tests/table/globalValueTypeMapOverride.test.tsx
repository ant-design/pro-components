import {
  BetaSchemaForm,
  ProConfigProvider,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

const valueTypeMap = {
  dateTime: {
    render: () => <span>CUSTOM_DATE_TIME</span>,
    formItemRender: () => <span>CUSTOM_DATE_TIME_INPUT</span>,
  },
};

const createdAt = 1700000000000;

afterEach(() => {
  cleanup();
});

describe('#9793 global valueTypeMap overrides built-in valueType', () => {
  it('ProTable uses the global dateTime renderer', async () => {
    const wrapper = render(
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        <ProTable
          rowKey="id"
          columns={[
            { dataIndex: 'createdAt', title: 'Created', valueType: 'dateTime' },
          ]}
          dataSource={[{ id: 1, createdAt }]}
          pagination={false}
          search={false}
          toolBarRender={false}
        />
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('CUSTOM_DATE_TIME')).toBeTruthy();
    });
  });

  it('ProDescriptions uses the global dateTime renderer', async () => {
    const wrapper = render(
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        <ProDescriptions
          dataSource={{ createdAt }}
          columns={[
            { dataIndex: 'createdAt', title: 'Created', valueType: 'dateTime' },
          ]}
        />
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('CUSTOM_DATE_TIME')).toBeTruthy();
    });
  });

  it('BetaSchemaForm uses the global dateTime formItemRender', async () => {
    const wrapper = render(
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        <BetaSchemaForm
          columns={[
            { dataIndex: 'createdAt', title: 'Created', valueType: 'dateTime' },
          ]}
        />
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('CUSTOM_DATE_TIME_INPUT')).toBeTruthy();
    });
  });
});
