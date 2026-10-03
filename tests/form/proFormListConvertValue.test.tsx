import {
  ProForm,
  ProFormList,
  ProFormText,
  type ProFormInstance,
} from '@ant-design/pro-components';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

const toList = (value: Record<string, string>) =>
  Object.entries(value).map(([key, itemValue]) => ({
    key,
    value: itemValue,
  }));

describe('ProFormList convertValue (#8702)', () => {
  it('converts initial and setFieldsValue data into list rows', async () => {
    const formRef = createRef<ProFormInstance>();
    const html = render(
      <ProForm
        formRef={formRef}
        submitter={false}
        initialValues={{ configs: { first: 'one', second: 'two' } }}
      >
        <ProFormList name="configs" convertValue={toList}>
          <ProFormText name="key" />
          <ProFormText name="value" />
        </ProFormList>
      </ProForm>,
    );

    await html.findByDisplayValue('first');
    expect(html.getByDisplayValue('two')).toBeTruthy();

    act(() => {
      formRef.current?.setFieldsValue({ configs: { third: 'three' } });
    });
    await waitFor(() => {
      expect(html.getByDisplayValue('third')).toBeTruthy();
      expect(html.getByDisplayValue('three')).toBeTruthy();
    });

    act(() => {
      formRef.current?.setFieldValue('configs', { fourth: 'four' });
    });
    await waitFor(() => {
      expect(html.getByDisplayValue('fourth')).toBeTruthy();
      expect(html.getByDisplayValue('four')).toBeTruthy();
    });
  });

  it('converts values at a nested list path', async () => {
    const formRef = createRef<ProFormInstance>();
    const html = render(
      <ProForm
        formRef={formRef}
        submitter={false}
        initialValues={{ items: [{ configs: { first: 'one' } }] }}
      >
        <ProFormList name="items">
          {(_, index) => (
            <ProFormList name={[index, 'configs']} convertValue={toList}>
              <ProFormText name="key" />
              <ProFormText name="value" />
            </ProFormList>
          )}
        </ProFormList>
      </ProForm>,
    );

    await html.findByDisplayValue('first');
    expect(html.getByDisplayValue('one')).toBeTruthy();

    act(() => {
      formRef.current?.setFieldsValue({
        items: [{ configs: { second: 'two' } }],
      });
    });
    await waitFor(() => {
      expect(html.getByDisplayValue('second')).toBeTruthy();
      expect(html.getByDisplayValue('two')).toBeTruthy();
    });

    act(() => {
      formRef.current?.setFieldValue(
        ['items', 0, 'configs'],
        { third: 'three' },
      );
    });
    await waitFor(() => {
      expect(html.getByDisplayValue('third')).toBeTruthy();
      expect(html.getByDisplayValue('three')).toBeTruthy();
    });
  });

  it('does not convert array values again after a user edit', async () => {
    const convertValue = vi.fn((value: { text: string }[]) =>
      value.map((item) => ({ value: item.text })),
    );
    const html = render(
      <ProForm
        submitter={false}
        initialValues={{ items: [{ text: 'initial' }] }}
      >
        <ProFormList name="items" convertValue={convertValue}>
          <ProFormText name="value" />
        </ProFormList>
      </ProForm>,
    );

    const input = await html.findByDisplayValue('initial');
    expect(convertValue).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: 'edited' } });

    await waitFor(() => {
      expect(html.getByDisplayValue('edited')).toBeTruthy();
    });
    expect(convertValue).toHaveBeenCalledTimes(1);
  });
});
