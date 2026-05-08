import { useEffect, useRef, useState } from 'react';
import { runFunction, useRefFunction, useUrlSearchParams } from '../../utils';
import type { BaseFormProps } from './BaseForm';

/**
 * 将 syncToUrl 的 boolean | function 形式统一转为实际参数对象。
 * 纯函数，方便单独测试。
 */
export const genUrlSyncParams = (
  syncUrl: BaseFormProps<any>['syncToUrl'],
  params: Record<string, any>,
  type: 'get' | 'set',
): Record<string, any> => {
  if (syncUrl === true) {
    return params;
  }
  return runFunction(syncUrl, params, type);
};

export type UseUrlSyncOptions<T> = {
  syncToUrl?: boolean | ((values: T, type: 'get' | 'set') => T);
  syncToUrlAsImportant?: boolean;
  syncToInitialValues?: boolean;
  extraUrlParams?: Record<string, any>;
};

export type UseUrlSyncResult = {
  /** URL 参数解析后要合并到 initialValues 的值 */
  urlParamsMergeInitialValues: Record<string, any>;
  /**
   * 在 Submitter.onReset 中调用，清空 URL 上的参数
   * @param finalValues 已经经过 transformKey 处理的当前表单值
   * @param extraUrlParams 当前的 extraUrlParams（需透传，避免闭包过期）
   */
  onUrlSyncReset: (
    finalValues: Record<string, any>,
    extraUrlParams?: Record<string, any>,
  ) => void;
  /**
   * 在 onFinish 中调用，将提交值同步写入 URL
   * @param finalValues 已经经过 transformKey 处理的最终提交值
   * @param allFieldKeys 表单所有字段的 key（用于补全需要置空的 key）
   * @param extraUrlParams 当前的 extraUrlParams
   */
  onUrlSyncFinish: (
    finalValues: Record<string, any>,
    allFieldKeys: string[],
    extraUrlParams?: Record<string, any>,
  ) => void;
};

/**
 * 管理 QueryFilter 等场景下 URL 参数与表单值之间的双向同步。
 *
 * 提取自 BaseForm，让 BaseForm 本身不需要关心 URL 同步细节。
 *
 * 职责：
 * - 管理 `urlSearch` 状态（通过 `useUrlSearchParams`）
 * - 初始化时从 URL 读取参数合并到 `initialValues`
 * - 重置时清空 URL 参数
 * - 提交时将表单值写入 URL
 * - `syncToInitialValues=false` 时清空已合并的 URL 参数
 * - `extraUrlParams` 变化时同步更新 URL
 */
export function useUrlSync<T = Record<string, any>>({
  syncToUrl,
  syncToInitialValues,
  extraUrlParams,
}: UseUrlSyncOptions<T>): UseUrlSyncResult {
  const [urlSearch, setUrlSearch] = useUrlSearchParams(
    {},
    { disabled: !syncToUrl },
  );

  const [urlParamsMergeInitialValues, setUrlParamsMergeInitialValues] =
    useState<Record<string, any>>(() => {
      if (!syncToUrl) return {};
      return genUrlSyncParams(syncToUrl, urlSearch, 'get');
    });

  // syncToInitialValues=false 时，清空已合并的 URL 参数（reset 时不回填 URL 数据）
  useEffect(() => {
    if (syncToInitialValues) return;
    setUrlParamsMergeInitialValues({});
  }, [syncToInitialValues]);

  // urlSearch ref，保证 onUrlSyncFinish 里拿到最新值（避免闭包陷阱）
  const urlSearchRef = useRef(urlSearch);
  useEffect(() => {
    urlSearchRef.current = urlSearch;
  }, [urlSearch]);

  // extraUrlParams 变化时，同步写入 URL
  const getExtraAndUrlParams = useRefFunction(() => ({
    ...urlSearchRef.current,
    ...extraUrlParams,
  }));

  useEffect(() => {
    if (!syncToUrl) return;
    setUrlSearch(genUrlSyncParams(syncToUrl, getExtraAndUrlParams(), 'set'));
  }, [extraUrlParams, getExtraAndUrlParams, syncToUrl]);

  // 重置时清空 URL 参数
  const onUrlSyncReset = useRefFunction(
    (
      finalValues: Record<string, any>,
      currentExtraUrlParams?: Record<string, any>,
    ) => {
      if (!syncToUrl) return;
      const params = Object.keys(finalValues).reduce<Record<string, any>>(
        (accumulated, key) => ({
          ...accumulated,
          [key]: finalValues[key] || undefined,
        }),
        currentExtraUrlParams ?? {},
      );
      setUrlSearch(genUrlSyncParams(syncToUrl, params, 'set'));
    },
  );

  // 提交时同步表单值到 URL
  const onUrlSyncFinish = useRefFunction(
    (
      finalValues: Record<string, any>,
      allFieldKeys: string[],
      currentExtraUrlParams?: Record<string, any>,
    ) => {
      if (!syncToUrl) return;

      const syncToUrlParams = allFieldKeys.reduce<Record<string, any>>(
        (accumulated, key) => ({
          ...accumulated,
          [key]: finalValues[key] ?? undefined,
        }),
        currentExtraUrlParams ?? {},
      );

      // fix #3547: 原先在 URL 中存在的字段如果新值为 falsy（但非 false/0），置为 undefined 以触发 URL 删除
      Object.keys(urlSearchRef.current).forEach((key) => {
        if (
          syncToUrlParams[key] !== false &&
          syncToUrlParams[key] !== 0 &&
          !syncToUrlParams[key]
        ) {
          syncToUrlParams[key] = undefined;
        }
      });

      setUrlSearch(genUrlSyncParams(syncToUrl, syncToUrlParams, 'set'));
    },
  );

  return {
    urlParamsMergeInitialValues,
    onUrlSyncReset,
    onUrlSyncFinish,
  };
}
