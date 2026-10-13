import { get } from '@rc-component/util';
import type { IntlType } from './intl';
import zhCN from './locale/zh_CN';

/** Default context messages without importing the full locale registry. */
export const defaultIntl: IntlType = {
  locale: 'default',
  getMessage(id, defaultMessage) {
    const value = get(zhCN, id.replace(/\[(\d+)\]/g, '.$1').split('.'));
    return typeof value === 'string' ? value : defaultMessage;
  },
};
