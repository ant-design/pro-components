import React from 'react';
import { ProForm, ProFormGroup } from '../../../es';
import type {
  GroupProps,
  ProFormGroupProps,
  ProFormItemProps,
} from '../../../es';

const groupProps: ProFormGroupProps = { title: 'Typed group' };
const legacyGroupProps: GroupProps = groupProps;
const itemProps: ProFormItemProps = { label: 'Typed item' };

const NamespaceGroup = () => (
  <ProForm>
    <ProForm.Group title="Namespace group" />
  </ProForm>
);

const NamedGroup = () => (
  <ProFormGroup {...legacyGroupProps}>
    <ProForm.Item {...itemProps}>content</ProForm.Item>
  </ProFormGroup>
);

export { NamedGroup, NamespaceGroup };
