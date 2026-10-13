import React from 'react';
import type { WarpFieldLightPopoverRenderProps } from '../../components/FormItem/warpFieldLightTypes';

export type LightFilterFieldContextValue = {
  /**
   * LightFilter 注入：非下拉 light 字段的 Popover 包裹实现。
   * createProFormField 默认路径不 import LightWrapper，仅通过此回调渲染。
   */
  renderLightPopoverField?: (
    props: WarpFieldLightPopoverRenderProps,
  ) => React.ReactNode;
};

export const LightFilterFieldContext =
  React.createContext<LightFilterFieldContextValue>({});
