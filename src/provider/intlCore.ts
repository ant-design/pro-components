import { get } from '@rc-component/util';
import zhCN from './locale/zh_CN';

export type IntlType = {
  locale: string;
  getMessage: (id: string, defaultMessage: string) => string;
};

/**
 * `zh-CN` 的 messages 快照，供 `createIntl` 的跨语言 fallback 使用。
 *
 * 这里要显式保存一份 messages 引用，而不是在运行时从 `intlMap['zh-CN'].getMessage` 取值，
 * 避免"createIntl 自身被改动为其他 fallback 策略时出现递归"的风险。
 */
const zhCNMessages: Record<string, any> = zhCN;

/**
 * 从 locale messages 中按 id 取值的工具。id 支持点号路径和方括号下标：
 * - `a.b.c`
 * - `a.b[0].c`
 * 返回 undefined 表示「该 locale 未定义此 key」；空字符串是合法文案（如 vi-VN
 * 的 `pagination.total.range: ' '`），不应被当作缺失而回落到 zh-CN（#9016）。
 */
const getMessageByPath = (
  messages: Record<string, any>,
  id: string,
): string | undefined => {
  const value = get(
    messages,
    id.replace(/\[(\d+)\]/g, '.$1').split('.'),
  ) as unknown;
  return typeof value === 'string' ? value : undefined;
};

/**
 * 创建一个国际化的操作函数。
 *
 * 当某 locale 找不到 id 对应的文案时，按以下顺序回退：
 * 1. zh-CN locale 自身找不到 → 返回 `defaultMessage`
 * 2. 其他 locale 找不到 → 去 zh-CN messages 里找；还找不到才返回 `defaultMessage`
 *
 * @param locale 语言标识，如 `'zh_CN'` / `'en_US'`（注意是下划线形式）
 * @param localeMap 该语言对应的 messages 对象
 */
export const createIntl = (
  locale: string,
  localeMap: Record<string, any>,
): IntlType => ({
  getMessage: (id: string, defaultMessage: string) => {
    const msg = getMessageByPath(localeMap, id);
    // 空字符串是合法文案（故意留空，如 vi-VN 分页范围前缀），直接返回
    if (msg !== undefined) return msg;
    const localeKeyDashed = locale.replace('_', '-');
    if (localeKeyDashed === 'zh-CN') {
      return defaultMessage;
    }
    // 使用本模块顶层缓存的 zh-CN messages，而不是反向查 intlMap['zh-CN']，
    // 避免 createIntl 实现演进时引入潜在递归。
    const fallback = getMessageByPath(zhCNMessages, id);
    return fallback || defaultMessage;
  },
  locale,
});
