import type { MutableRefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  buildSchemaColumnGetters,
  mergeOriginColumnToItemType,
} from '../../src/form/components/SchemaForm/normalizeColumnToItemType';

describe('normalizeColumnToItemType', () => {
  it('mergeOriginColumnToItemType maps dataIndex, key and valueType', () => {
    const item = mergeOriginColumnToItemType({
      originItem: { dataIndex: 'x', valueType: 'text' },
      index: 2,
      title: 'T',
      label: 'T',
      getters: {},
    });
    expect(item.dataIndex).toBe('x');
    expect(item.key).toBe('x');
    expect(item.valueType).toBe('text');
    expect(item.title).toBe('T');
  });

  it('buildSchemaColumnGetters wires fieldProps to getFieldProps', () => {
    const originItem = {
      dataIndex: 'a',
      valueType: 'text' as const,
      fieldProps: vi.fn(() => ({ id: 'fid' })),
    };
    const formRef = {
      current: { getFieldsValue: vi.fn() },
    } as MutableRefObject<any>;
    const { getFieldProps } = buildSchemaColumnGetters({
      originItem,
      formRef,
    });
    expect(getFieldProps).toBeDefined();
    expect(getFieldProps!()).toEqual({ id: 'fid' });
    expect(originItem.fieldProps).toHaveBeenCalledWith(
      formRef.current,
      originItem,
    );
  });
});
