import {
  ProField,
  type ProFieldPropsType,
  PureProField,
} from '@ant-design/pro-components';
import type React from 'react';
import { expect, it } from 'vitest';

type ProFieldComponent = React.ForwardRefExoticComponent<
  ProFieldPropsType & React.RefAttributes<any>
>;

it('exposes ProField components as forwardRef components', () => {
  const components: ProFieldComponent[] = [ProField, PureProField];

  expect(components).toHaveLength(2);
});
