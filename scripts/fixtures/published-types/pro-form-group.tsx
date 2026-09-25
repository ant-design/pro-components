import React from 'react';
import { ProForm, ProFormGroup } from '../../../es';

const NamespaceGroup = () => (
  <ProForm>
    <ProForm.Group title="Namespace group" />
  </ProForm>
);

const NamedGroup = () => <ProFormGroup title="Named group" />;

export { NamedGroup, NamespaceGroup };
