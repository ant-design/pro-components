import { ProForm, ProFormColorPicker } from '../../../src';
import type { AggregationColor } from '../../../src/utils/antdTypes';

/**
 * #8740:ProFormColorPicker fieldProps.onChange 应兼容 antd ColorPicker 的
 * (value: AggregationColor, css: string) => void 签名,无需 @ts-ignore。
 * 字符串签名(旧文档用法)也保持可用。
 */
export function ColorPickerOnChangeTyped() {
  return (
    <ProForm>
      <ProFormColorPicker
        name={['background', 'color']}
        label="颜色"
        fieldProps={{
          disabledAlpha: true,
          onChange: (color: AggregationColor) => {
            const hex: string = color.toHexString();
            console.log(hex);
          },
        }}
      />
      <ProFormColorPicker
        name="simple"
        label="简单用法"
        fieldProps={{
          onChange: (color: string) => {
            console.log(color);
          },
        }}
      />
    </ProForm>
  );
}
