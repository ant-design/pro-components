import {
  BetaSchemaForm,
  ProConfigProvider,
  ProDescriptions,
  ProForm,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTimePicker,
  ProFormTimeRangePicker,
  ProTable,
} from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import type { ComponentType } from 'react';
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

type FormCase = {
  label: string;
  valueType: string;
  Component: ComponentType<any>;
  initialValue: any;
  builtinSelector: string;
  extraProps?: Record<string, any>;
};

const standaloneFormCases: FormCase[] = [
  {
    label: 'ProFormTimePicker',
    valueType: 'time',
    Component: ProFormTimePicker,
    initialValue: '12:30:00',
    builtinSelector: '.ant-picker',
  },
  {
    label: 'ProFormTimeRangePicker',
    valueType: 'timeRange',
    Component: ProFormTimeRangePicker,
    initialValue: ['12:00:00', '13:00:00'],
    builtinSelector: '.ant-picker',
  },
  {
    label: 'ProFormMoney',
    valueType: 'money',
    Component: ProFormMoney,
    initialValue: 123.45,
    builtinSelector: 'input',
  },
  {
    label: 'ProFormDigit',
    valueType: 'digit',
    Component: ProFormDigit,
    initialValue: 42,
    builtinSelector: '.ant-input-number',
  },
  {
    label: 'ProFormSelect',
    valueType: 'select',
    Component: ProFormSelect,
    initialValue: 'a',
    builtinSelector: '.ant-select',
    extraProps: { options: [{ label: 'A', value: 'a' }] },
  },
  {
    label: 'ProFormText',
    valueType: 'text',
    Component: ProFormText,
    initialValue: 'hello',
    builtinSelector: 'input.ant-input',
  },
];

describe.each(standaloneFormCases)(
  '$label global valueTypeMap override',
  ({ valueType, Component, initialValue, builtinSelector, extraProps }) => {
    const overrideMap = {
      [valueType]: {
        render: () => <span>GLOBAL_READ</span>,
        formItemRender: () => <span>GLOBAL_EDIT</span>,
      },
    };

    it('uses the global formItemRender in edit mode', async () => {
      const wrapper = render(
        <ProConfigProvider valueTypeMap={overrideMap}>
          <ProForm submitter={false} initialValues={{ field: initialValue }}>
            <Component name="field" {...extraProps} />
          </ProForm>
        </ProConfigProvider>,
      );

      await waitFor(() => {
        expect(wrapper.getByText('GLOBAL_EDIT')).toBeTruthy();
      });
    });

    it('uses the global render in read mode', async () => {
      const wrapper = render(
        <ProConfigProvider valueTypeMap={overrideMap}>
          <ProForm
            submitter={false}
            readonly
            initialValues={{ field: initialValue }}
          >
            <Component name="field" {...extraProps} />
          </ProForm>
        </ProConfigProvider>,
      );

      await waitFor(() => {
        expect(wrapper.getByText('GLOBAL_READ')).toBeTruthy();
      });
    });

    it('keeps the built-in control when only render is overridden', async () => {
      const wrapper = render(
        <ProConfigProvider
          valueTypeMap={{
            [valueType]: { render: () => <span>GLOBAL_READ</span> },
          }}
        >
          <ProForm submitter={false}>
            <Component name="field" {...extraProps} />
          </ProForm>
        </ProConfigProvider>,
      );

      await waitFor(() => {
        expect(wrapper.queryByText('GLOBAL_READ')).toBeNull();
        expect(wrapper.container.querySelector(builtinSelector)).toBeTruthy();
      });
    });
  },
);

describe('standalone form components nested in table/descriptions', () => {
  it('keeps ProFormMoney locale handling inside ProDescriptions', async () => {
    const wrapper = render(
      <ProDescriptions
        dataSource={{}}
        columns={[]}
        title={
          <ProForm submitter={false} initialValues={{ amount: 44.33 }}>
            <ProFormMoney name="amount" locale="en-US" />
          </ProForm>
        }
      />,
    );

    await waitFor(() => {
      const input = wrapper.container.querySelector(
        'input[id$="_amount"]',
      ) as HTMLInputElement;
      expect(input?.value).toContain('$ 44.33');
    });
  });

  it('preserves proFieldProps.locale when no top-level locale is given', async () => {
    const wrapper = render(
      <ProForm submitter={false} initialValues={{ amount: 44.33 }}>
        <ProFormMoney
          name="amount"
          proFieldProps={{ locale: 'en-US' } as any}
        />
      </ProForm>,
    );

    await waitFor(() => {
      const input = wrapper.container.querySelector(
        'input[id$="_amount"]',
      ) as HTMLInputElement;
      expect(input?.value).toContain('$ 44.33');
    });
  });

  it('lets an explicit top-level locale win over proFieldProps.locale', async () => {
    const wrapper = render(
      <ProForm submitter={false} initialValues={{ amount: 44.33 }}>
        <ProFormMoney
          name="amount"
          locale="ru-RU"
          proFieldProps={{ locale: 'en-US' } as any}
        />
      </ProForm>,
    );

    await waitFor(() => {
      const input = wrapper.container.querySelector(
        'input[id$="_amount"]',
      ) as HTMLInputElement;
      expect(input?.value).toContain('₽');
    });
  });

  it('keeps ProFormDigit and ProFormSelect defaults inside ProTable', async () => {
    const wrapper = render(
      <ProTable
        rowKey="id"
        columns={[]}
        dataSource={[]}
        pagination={false}
        toolBarRender={() => [
          <ProForm submitter={false} key="form">
            <ProFormDigit name="count" />
            <ProFormSelect
              name="choice"
              options={[{ label: 'A', value: 'a' }]}
            />
          </ProForm>,
        ]}
      />,
    );

    await waitFor(() => {
      expect(wrapper.container.querySelector('.ant-input-number')).toBeTruthy();
      expect(wrapper.container.querySelector('.ant-select')).toBeTruthy();
    });
  });
});

describe.each([
  {
    name: 'ProFormMoney',
    valueType: 'money',
    Component: ProFormMoney as ComponentType<any>,
  },
  {
    name: 'ProFormText',
    valueType: 'text',
    Component: ProFormText as ComponentType<any>,
  },
])('$name field-level renderer props', ({ valueType, Component }) => {
  const overrideMap = {
    [valueType]: {
      render: () => <span>GLOBAL_READ</span>,
      formItemRender: () => <span>GLOBAL_EDIT</span>,
    },
  };

  it('keeps value on the field-level render callback', async () => {
    const received: any[] = [];
    const wrapper = render(
      <ProConfigProvider valueTypeMap={overrideMap}>
        <ProForm submitter={false} readonly initialValues={{ field: 44.33 }}>
          <Component
            name="field"
            render={(text: any, props: any) => {
              received.push(props);
              return <span>FIELD_READ</span>;
            }}
          />
        </ProForm>
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('FIELD_READ')).toBeTruthy();
    });
    expect(received[0].mode).toBe('read');
    expect(received[0].value).toBe(44.33);
  });

  it('keeps value on the field-level formItemRender callback', async () => {
    const received: any[] = [];
    const wrapper = render(
      <ProConfigProvider valueTypeMap={overrideMap}>
        <ProForm submitter={false} initialValues={{ field: 44.33 }}>
          <Component
            name="field"
            formItemRender={(text: any, props: any) => {
              received.push(props);
              return <span>FIELD_EDIT</span>;
            }}
          />
        </ProForm>
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('FIELD_EDIT')).toBeTruthy();
    });
    expect(received[0].mode).toBe('edit');
    expect(received[0].value).toBe(44.33);
  });

  it('keeps flat props on callbacks passed through proFieldProps', async () => {
    const readProps: any[] = [];
    const editProps: any[] = [];
    const emptyProps: any[] = [];
    const wrapper = render(
      <ProConfigProvider valueTypeMap={overrideMap}>
        <ProForm submitter={false} readonly initialValues={{ field: 44.33 }}>
          <Component
            name="field"
            proFieldProps={{
              render: (text: any, props: any) => {
                readProps.push(props);
                return <span>PRO_READ</span>;
              },
            }}
          />
        </ProForm>
        <ProForm submitter={false} initialValues={{ field: 44.33 }}>
          <Component
            name="field"
            proFieldProps={{
              formItemRender: (text: any, props: any) => {
                editProps.push(props);
                return <span>PRO_EDIT</span>;
              },
            }}
          />
        </ProForm>
        <ProForm submitter={false} readonly initialValues={{ field: '' }}>
          <Component
            name="field"
            proFieldProps={{
              render: (text: any, props: any) => {
                emptyProps.push(props);
                return <span>PRO_EMPTY</span>;
              },
            }}
          />
        </ProForm>
      </ProConfigProvider>,
    );

    await waitFor(() => {
      expect(wrapper.getByText('PRO_READ')).toBeTruthy();
      expect(wrapper.getByText('PRO_EDIT')).toBeTruthy();
      expect(wrapper.getByText('PRO_EMPTY')).toBeTruthy();
    });
    expect(readProps[0].mode).toBe('read');
    expect(readProps[0].value).toBe(44.33);
    expect('fieldProps' in readProps[0]).toBe(false);
    expect(editProps[0].mode).toBe('edit');
    expect(editProps[0].value).toBe(44.33);
    expect('fieldProps' in editProps[0]).toBe(false);
    expect(emptyProps[0].mode).toBe('read');
    expect(emptyProps[0].value).toBe('');
    expect('fieldProps' in emptyProps[0]).toBe(false);
  });
});
