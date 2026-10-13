import React from 'react';
import type { ProFormFieldLightPopoverRenderProps } from '../../components/FormItem/proFormFieldLightTypes';
import { LightFilterPopoverField } from './LightFilterPopoverField';

export function renderLightPopoverField(
  props: ProFormFieldLightPopoverRenderProps,
) {
  return <LightFilterPopoverField {...props} />;
}
