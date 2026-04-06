import { runFunction } from '../../utils';

export type SyncToUrlConfig =
  | boolean
  | ((values: any, type: 'get' | 'set') => any);

/**
 * 将 syncToUrl 配置与查询参数合并；`syncToUrl === true` 时原样返回 `params`。
 */
export function genParams(
  syncUrl: SyncToUrlConfig | undefined,
  params: Record<string, any>,
  type: 'get' | 'set',
) {
  if (syncUrl === true) {
    return params;
  }
  return runFunction(syncUrl, params, type);
}
