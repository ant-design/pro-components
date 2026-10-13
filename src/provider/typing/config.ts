import type React from 'react';
import type {
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
} from '../../utils/valueEnumType';
import type { IntlType } from '../intl';
import type { ProAliasToken } from './aliasToken';

export type BaseProFieldFC = {
  text: React.ReactNode;
  fieldProps?: any;
  mode?: ProFieldFCMode;
  light?: boolean;
  label?: React.ReactNode;
  valueEnum?: ProSchemaValueEnumObj | ProSchemaValueEnumMap;
  proFieldKey?: React.Key;
};

export type ProFieldFCMode = 'read' | 'edit' | 'update';

export type ProFieldFCRenderProps = {
  mode?: ProFieldFCMode;
  readonly?: boolean;
  placeholder?: string | string[];
  value?: any;
  onChange?: (...rest: any[]) => void;
} & BaseProFieldFC;

export type ProRenderFieldPropsType = {
  render?: (
    text: any,
    props: Omit<ProFieldFCRenderProps, 'value' | 'onChange'>,
    dom: React.JSX.Element,
  ) => React.JSX.Element;
  formItemRender?: (
    text: any,
    props: ProFieldFCRenderProps,
    dom: React.JSX.Element,
  ) => React.JSX.Element;
};

export type ParamsType = Record<string, any>;

export type ConfigContextPropsType = {
  intl?: IntlType;
  valueTypeMap?: Record<string, ProRenderFieldPropsType>;
  token: ProAliasToken;
  hashId?: string;
  hashed?: boolean;
  dark?: boolean;
  prefixCls?: string;
};
