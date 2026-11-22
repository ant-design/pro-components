import {
  BetaSchemaForm,
  ProConfigProvider,
  ProDescriptions,
  ProForm,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
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

  it('keeps the built-in edit renderer when only render is overridden', async () => {
    const wrapper = render(
      <ProConfigProvider
        valueTypeMap={{
          dateTime: { render: () => <span>CUSTOM_DATE_TIME</span> },
        }}
      >
        <BetaSchemaForm
          columns={[
            { dataIndex: 'createdAt', title: 'Created', valueType: 'dateTime' },
          ]}
        />
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.container.querySelector('.ant-picker')).toBeTruthy();
    });
  });

  it('ProFormDateTimePicker uses the global dateTime formItemRender', async () => {
    const wrapper = render(
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        <ProForm submitter={false}>
          <ProFormDateTimePicker name="createdAt" />
        </ProForm>
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('CUSTOM_DATE_TIME_INPUT')).toBeTruthy();
    });
  });

  it('ProFormDateTimePicker uses the global dateTime render in read mode', async () => {
    const wrapper = render(
      <ProConfigProvider valueTypeMap={valueTypeMap}>
        <ProForm submitter={false} readonly initialValues={{ createdAt }}>
          <ProFormDateTimePicker name="createdAt" />
        </ProForm>
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('CUSTOM_DATE_TIME')).toBeTruthy();
    });
  });

  it('ProFormDateTimeRangePicker uses the global dateTimeRange formItemRender', async () => {
    const wrapper = render(
      <ProConfigProvider
        valueTypeMap={{
          dateTimeRange: {
            formItemRender: () => <span>CUSTOM_RANGE_INPUT</span>,
          },
        }}
      >
        <ProForm submitter={false}>
          <ProFormDateTimeRangePicker name="range" />
        </ProForm>
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('CUSTOM_RANGE_INPUT')).toBeTruthy();
    });
  });

  it('keeps the built-in picker for unregistered and render-only valueTypes', async () => {
    const wrapper = render(
      <ProConfigProvider
        valueTypeMap={{
          dateTime: { render: () => <span>CUSTOM_DATE_TIME</span> },
        }}
      >
        <ProForm submitter={false}>
          <ProFormDateTimePicker name="createdAt" />
          <ProFormDatePicker name="date" />
        </ProForm>
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('.ant-picker').length).toBe(2);
    });
    expect(wrapper.queryByText('CUSTOM_DATE_TIME')).toBeNull();
  });

  it('keeps the picker renderer when nested inside ProDescriptions', async () => {
    const wrapper = render(
      <ProDescriptions
        dataSource={{}}
        columns={[]}
        title={
          <ProForm submitter={false}>
            <ProFormDateTimePicker name="createdAt" />
          </ProForm>
        }
      />,
    );

    await waitFor(() => {
      expect(wrapper.container.querySelector('.ant-picker')).toBeTruthy();
    });
  });
});
