import type {
  ProFormColumnsType,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormField,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

/**
 * RFC 阶段 3 / ProField 路径：同一 `initialValues` 下，`BetaSchemaForm` 与手写 `ProFormXxx`（或 `ProFormField`）
 * 的 `getFieldsValue(true)` 应对齐（见 `docs/internal/form-architecture.md`「Schema 路径」）。
 */

function expectAlignedFieldValue(a: unknown, b: unknown) {
  if (dayjs.isDayjs(a) && dayjs.isDayjs(b)) {
    expect(a.valueOf()).toBe(b.valueOf());
    return;
  }
  expect(a).toBe(b);
}

async function readSchemaFieldsValue(
  columns: ProFormColumnsType<Record<string, any>>[],
  initialValues: Record<string, any>,
): Promise<Record<string, any>> {
  const schemaRef = createRef<ProFormInstance>();
  const { unmount } = render(
    <BetaSchemaForm
      formRef={schemaRef}
      columns={columns}
      initialValues={initialValues}
    />,
  );
  await waitFor(() => expect(schemaRef.current?.getFieldsValue?.()).toBeDefined());
  const values = schemaRef.current!.getFieldsValue(true);
  unmount();
  cleanup();
  return values;
}

async function readImperativeFieldsValue(
  initialValues: Record<string, any>,
  children: ReactNode,
): Promise<Record<string, any>> {
  const ref = createRef<ProFormInstance>();
  const { unmount } = render(
    <ProForm formRef={ref} initialValues={initialValues}>
      {children}
    </ProForm>,
  );
  await waitFor(() => expect(ref.current?.getFieldsValue?.()).toBeDefined());
  const values = ref.current!.getFieldsValue(true);
  unmount();
  return values;
}

describe('Schema vs imperative alignment', () => {
  afterEach(() => {
    cleanup();
  });

  it('text column (valueType text) matches ProFormText', async () => {
    const initialValues = { fieldA: 'hello' };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      { title: 'A', dataIndex: 'fieldA', valueType: 'text' },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormText name="fieldA" />
    ));

    expect(schemaValues.fieldA).toBe(imperativeValues.fieldA);
    expect(schemaValues.fieldA).toBe('hello');
  });

  it('digit column matches ProFormDigit', async () => {
    const initialValues = { fieldNum: 42 };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      { title: 'N', dataIndex: 'fieldNum', valueType: 'digit' },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormDigit name="fieldNum" />
    ));

    expect(schemaValues.fieldNum).toBe(imperativeValues.fieldNum);
    expect(schemaValues.fieldNum).toBe(42);
  });

  it('select column matches ProFormSelect', async () => {
    const valueEnum = {
      open: { text: '未解决' },
      closed: { text: '已解决' },
    };
    const initialValues = { fieldSel: 'open' };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      {
        title: 'S',
        dataIndex: 'fieldSel',
        valueType: 'select',
        valueEnum,
      },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormSelect name="fieldSel" valueEnum={valueEnum} />
    ));

    expect(schemaValues.fieldSel).toBe(imperativeValues.fieldSel);
    expect(schemaValues.fieldSel).toBe('open');
  });

  it('dateTime column matches ProFormDateTimePicker', async () => {
    const fieldDt = dayjs('2023-01-15 14:30:00');
    const initialValues = { fieldDt };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      { title: 'D', dataIndex: 'fieldDt', valueType: 'dateTime' },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormDateTimePicker name="fieldDt" />
    ));

    expectAlignedFieldValue(schemaValues.fieldDt, imperativeValues.fieldDt);
    expect(dayjs.isDayjs(schemaValues.fieldDt)).toBe(true);
  });

  it('switch column matches ProFormSwitch', async () => {
    const initialValues = { fieldSw: true };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      { title: 'W', dataIndex: 'fieldSw', valueType: 'switch' },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormSwitch name="fieldSw" />
    ));

    expectAlignedFieldValue(schemaValues.fieldSw, imperativeValues.fieldSw);
    expect(schemaValues.fieldSw).toBe(true);
  });

  it('date column (valueType date) matches ProFormDatePicker', async () => {
    const fieldDay = dayjs('2023-06-10');
    const initialValues = { fieldDay };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      { title: 'Day', dataIndex: 'fieldDay', valueType: 'date' },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormDatePicker name="fieldDay" />
    ));

    expectAlignedFieldValue(schemaValues.fieldDay, imperativeValues.fieldDay);
    expect(dayjs.isDayjs(schemaValues.fieldDay)).toBe(true);
  });

  it('checkbox column matches ProFormCheckbox', async () => {
    const initialValues = { fieldCk: true };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      { title: 'C', dataIndex: 'fieldCk', valueType: 'checkbox' },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormCheckbox name="fieldCk" />
    ));

    expectAlignedFieldValue(schemaValues.fieldCk, imperativeValues.fieldCk);
    expect(schemaValues.fieldCk).toBe(true);
  });

  it('textarea column matches ProFormTextArea', async () => {
    const initialValues = { fieldTa: 'line1\nline2' };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      { title: 'T', dataIndex: 'fieldTa', valueType: 'textarea' },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormTextArea name="fieldTa" />
    ));

    expect(schemaValues.fieldTa).toBe(imperativeValues.fieldTa);
    expect(schemaValues.fieldTa).toBe('line1\nline2');
  });

  it('password column matches ProFormField valueType password', async () => {
    const initialValues = { fieldPw: 'secret' };
    const columns: ProFormColumnsType<Record<string, any>>[] = [
      { title: 'P', dataIndex: 'fieldPw', valueType: 'password' },
    ];

    const schemaValues = await readSchemaFieldsValue(columns, initialValues);
    const imperativeValues = await readImperativeFieldsValue(initialValues, (
      <ProFormField name="fieldPw" valueType="password" />
    ));

    expect(schemaValues.fieldPw).toBe(imperativeValues.fieldPw);
    expect(schemaValues.fieldPw).toBe('secret');
  });
});
