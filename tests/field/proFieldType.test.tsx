import { ProField, type ProFieldPropsType } from '@ant-design/pro-components';
import type React from 'react';
import { expect, it } from 'vitest';

type ProFieldComponent = React.ForwardRefExoticComponent<
  ProFieldPropsType & React.RefAttributes<any>
>;

it('exposes ProField as a forwardRef component', () => {
  const component: ProFieldComponent = ProField;

  expect(component).toBe(ProField);
});
