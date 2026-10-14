import type {
  ExtendsProps,
  ProFormFieldShellFunctionProps,
  ProFormItemCreateConfig,
} from '../../../es/form';
import { createProFormField, pickProFormItemProps } from '../../../es/form';

const fieldConfig: ProFormItemCreateConfig = {
  valueType: 'text',
  ignoreWidth: true,
};

const extendsProps: ExtendsProps = {
  readonly: false,
  fieldConfig,
};

const schemaFns: ProFormFieldShellFunctionProps = {
  getFieldProps: () => ({ id: 'demo' }),
};

const picked = pickProFormItemProps({ label: 'L', name: 'n', rules: [] });

const Custom = createProFormField(() => null, fieldConfig);

export { Custom, extendsProps, picked, schemaFns };
