import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProForm,
  ProFormFieldSet,
  ProFormList,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(cleanup);

describe('convertValue and transform pipeline (#8907, #8480, #9120, #9032)', () => {
  it('converts a FieldSet value once and transforms edited values on submit', async () => {
    const formRef = React.createRef<ProFormInstance>();
    const { container } = render(
      <ProForm
        formRef={formRef}
        submitter={false}
        initialValues={{ printing_time: '11:52' }}
      >
        <ProFormFieldSet
          name="printing_time"
          convertValue={(value) =>
            typeof value === 'string' ? value.split(':').map(Number) : value
          }
          transform={(value) => ({ printing_time: `${value[0]}:${value[1]}` })}
        >
          <ProFormText fieldProps={{ 'data-testid': 'hours' }} />
          <ProFormText fieldProps={{ 'data-testid': 'minutes' }} />
        </ProFormFieldSet>
      </ProForm>,
    );

    const hours = container.querySelector('[data-testid="hours"]')!;
    const minutes = container.querySelector('[data-testid="minutes"]')!;
    await waitFor(() => {
      expect(hours).toHaveValue('11');
      expect(minutes).toHaveValue('52');
    });
    fireEvent.change(hours, { target: { value: '12' } });
    expect(formRef.current?.getFieldsFormatValue?.()).toEqual({
      printing_time: '12:52',
    });
  });

  it('passes the whole entity to convertValue', async () => {
    const formRef = React.createRef<ProFormInstance>();
    const convertValue = vi.fn((_value, _path, entity) => [
      entity?.startDate,
      entity?.endDate,
    ]);
    const { container } = render(
      <ProForm
        formRef={formRef}
        submitter={false}
        initialValues={{ startDate: '2026-10-01', endDate: '2026-10-02' }}
      >
        <ProFormFieldSet
          name="range"
          convertValue={convertValue}
          transform={(value) => ({ range: value })}
        >
          <ProFormText fieldProps={{ 'data-testid': 'start' }} />
          <ProFormText fieldProps={{ 'data-testid': 'end' }} />
        </ProFormFieldSet>
      </ProForm>,
    );
    await waitFor(() => {
      expect(container.querySelector('[data-testid="start"]')).toHaveValue(
        '2026-10-01',
      );
      expect(container.querySelector('[data-testid="end"]')).toHaveValue(
        '2026-10-02',
      );
    });
    formRef.current?.setFieldValue?.('range', ['2026-10-01', '2026-10-02']);
    convertValue.mockClear();
    formRef.current?.getFieldFormatValue?.('range');
    expect(convertValue).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        startDate: '2026-10-01',
        endDate: '2026-10-02',
      }),
    );
  });

  it('keeps child transforms inside nested ProFormList paths', async () => {
    const formRef = React.createRef<ProFormInstance>();
    render(
      <ProForm
        formRef={formRef}
        submitter={false}
        initialValues={{ items: [{ groups: [{ name: 'alpha' }] }] }}
      >
        <ProFormList name="items">
          <ProFormList name="groups">
            <ProFormText
              name="name"
              transform={(value) => ({ normalizedName: value.toUpperCase() })}
            />
          </ProFormList>
        </ProFormList>
      </ProForm>,
    );
    await waitFor(() => expect(formRef.current).toBeTruthy());
    expect(formRef.current?.getFieldsFormatValue?.()).toEqual({
      items: [{ groups: [{ normalizedName: 'ALPHA' }] }],
    });
  });

  it('supports top-level ProTable column transform and convertValue', async () => {
    const formRef = {
      current: undefined,
    } as React.MutableRefObject<ProFormInstance | undefined>;
    const { container } = render(
      <ProTable
        type="form"
        formRef={formRef}
        form={{ initialValues: { amount: '12' } }}
        columns={[
          {
            title: '金额',
            dataIndex: 'amount',
            valueType: 'digit',
            convertValue: (value) => Number(value),
            transform: (value) => ({ amountInCents: Number(value) * 100 }),
          },
        ]}
      />,
    );
    await waitFor(() =>
      expect(container.querySelector('input[role="spinbutton"]')).toHaveValue(
        '12',
      ),
    );
    expect(formRef.current?.getFieldsFormatValue?.()).toEqual({
      amountInCents: 1200,
    });
  });

  it('applies a column convertValue to an editable cell', async () => {
    const { container } = render(
      <ProTable
        rowKey="id"
        search={false}
        options={false}
        pagination={false}
        dataSource={[{ id: '1', code: 'abc' }]}
        editable={{ editableKeys: ['1'] }}
        columns={[
          {
            title: '编码',
            dataIndex: 'code',
            convertValue: (value) => value?.toUpperCase(),
          },
        ]}
      />,
    );
    await waitFor(() =>
      expect(container.querySelector('input')).toHaveValue('ABC'),
    );
  });
});
