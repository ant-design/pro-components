import React from 'react';
import type { WarpFieldLightPopoverRenderProps } from '../../components/FormItem/warpFieldLightTypes';
import { LightFilterPopoverField } from './LightFilterPopoverField';

export function renderLightPopoverField(
  props: WarpFieldLightPopoverRenderProps,
) {
  return <LightFilterPopoverField {...props} />;
}
