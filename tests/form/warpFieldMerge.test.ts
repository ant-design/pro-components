import { describe, expect, it } from 'vitest';
import {
  computeWarpFieldProFieldKey,
  mergeWarpFieldFieldProps,
  mergeWarpFieldFormItemProps,
  mergeWarpFieldOtherProps,
  mergeWarpFieldProFieldProps,
} from '../../src/form/components/FormItem/warpFieldMerge';

describe('warpFieldMerge', () => {
  it('mergeWarpFieldFieldProps: rest.fieldProps overrides context', () => {
    const merged = mergeWarpFieldFieldProps({
      ignoreFormItem: false,
      restValue: undefined,
      contextFieldProps: { a: 1, style: { width: 100 } },
      changedFieldProps: { b: 2 },
      restFieldProps: { a: 2, c: 3 },
    });
    expect(merged.a).toBe(2);
    expect(merged.b).toBe(2);
    expect(merged.c).toBe(3);
  });

  it('mergeWarpFieldFormItemProps: explicit formItemProps wins', () => {
    const merged = mergeWarpFieldFormItemProps({
      contextFormItemProps: { label: 'ctx' },
      restFormItemProps: { name: 'x' },
      changedFormItemProps: { help: 'h' },
      restFormItemPropsExplicit: { label: 'user' },
    });
    expect(merged.label).toBe('user');
    expect(merged.name).toBe('x');
    expect(merged.help).toBe('h');
  });

  it('mergeWarpFieldOtherProps: formItemProps overrides defaultFormItemProps', () => {
    const merged = mergeWarpFieldOtherProps({
      messageVariables: { x: 1 },
      defaultFormItemProps: { label: 'def', hidden: false },
      formItemProps: { label: 'final' },
    });
    expect(merged.label).toBe('final');
    expect(merged.hidden).toBe(false);
    expect(merged.messageVariables).toEqual({ x: 1 });
  });

  it('computeWarpFieldProFieldKey', () => {
    expect(
      computeWarpFieldProFieldKey({
        name: ['a', 'b'],
        prefixName: ['p'],
        formKey: 'k',
      }),
    ).toBe('form-k-field-p.a_b');
  });

  it('mergeWarpFieldProFieldProps', () => {
    const merged = mergeWarpFieldProFieldProps({
      contextProFieldProps: { x: 1 },
      proFieldProps: { x: 2, y: 3 },
    });
    expect(merged.x).toBe(2);
    expect(merged.y).toBe(3);
  });
});
