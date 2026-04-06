import { describe, expect, it } from 'vitest';
import { buildWarpFieldLightProps } from '../../src/form/components/FormItem/warpFieldLightProps';

describe('buildWarpFieldLightProps', () => {
  it('LightFilter: proFieldLight sets lightProps.light for lightweight filter row UI', () => {
    const lightOn = buildWarpFieldLightProps({
      fieldProps: {},
      valueType: 'text',
      proFieldLight: true,
    });
    expect(lightOn.light).toBe(true);

    const lightOff = buildWarpFieldLightProps({
      fieldProps: {},
      valueType: 'text',
      proFieldLight: false,
    });
    expect(lightOff.light).toBe(false);
  });

  it('merges fieldProps first, then fixed keys, then restLightProps, then otherPropsLightProps', () => {
    const out = buildWarpFieldLightProps({
      fieldProps: { a: 1 },
      valueType: 'digit',
      bordered: false,
      allowClear: true,
      proFieldLight: true,
      label: 'L',
      restLightProps: { a: 2 },
      otherPropsLightProps: { a: 3, bordered: 'fromOther' },
    });
    expect(out.a).toBe(3);
    expect(out.bordered).toBe('fromOther');
    expect(out.valueType).toBe('digit');
    expect(out.light).toBe(true);
    expect(out.label).toBe('L');
  });

  it('fieldAllowClear wins over allowClear', () => {
    const out = buildWarpFieldLightProps({
      fieldProps: {},
      valueType: 'text',
      allowClear: true,
      fieldAllowClear: false,
    });
    expect(out.allowClear).toBe(false);
  });

  it('omits undefined values from merged object', () => {
    const out = buildWarpFieldLightProps({
      fieldProps: { x: 1 },
      valueType: 'text',
      bordered: undefined,
      allowClear: undefined,
    });
    expect('bordered' in out).toBe(false);
    expect(out.x).toBe(1);
  });
});
