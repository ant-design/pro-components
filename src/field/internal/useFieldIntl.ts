import { ConfigProvider as AntdConfigProvider } from 'antd';
import { useContext } from 'react';
import { ProConfigContext } from '../../provider/context';
import type { IntlType } from '../../provider/intl';
import { fieldIntlMap, findFieldLocaleKey } from './fieldLocale';

/** Resolve only field messages unless ProConfigProvider supplies an intl instance. */
export function useFieldIntl(): IntlType {
  const { locale } = useContext(AntdConfigProvider.ConfigContext);
  const { intl } = useContext(ProConfigContext);
  return intl && intl.locale !== 'default'
    ? intl
    : fieldIntlMap[findFieldLocaleKey(locale?.locale)];
}
