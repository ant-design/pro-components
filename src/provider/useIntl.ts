import { ConfigProvider as AntdConfigProvider } from 'antd';
import { useContext } from 'react';
import { ProConfigContext } from './context';
import type { IntlType } from './intl';
import { resolveIntl } from './utils/config';

export function useIntl(): IntlType {
  const { locale } = useContext(AntdConfigProvider.ConfigContext);
  const { intl } = useContext(ProConfigContext);
  return resolveIntl(undefined, intl, locale?.locale);
}
