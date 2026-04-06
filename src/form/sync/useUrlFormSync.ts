import { useUrlSearchParams } from '@umijs/use-params';
import { useEffect, useState } from 'react';
import { useRefFunction } from '../../utils';
import type { SyncToUrlConfig } from './genParams';
import { genParams } from './genParams';

export type UseUrlFormSyncOptions = {
  syncToUrl: SyncToUrlConfig | undefined;
  extraUrlParams: Record<string, any>;
  syncToInitialValues: boolean;
};

/**
 * URL 查询与「写入 initialValues 的 URL 片段」状态；与 {@link genParams} 配合使用。
 */
export function useUrlFormSync({
  syncToUrl,
  extraUrlParams,
  syncToInitialValues,
}: UseUrlFormSyncOptions) {
  const [urlSearch, setUrlSearch] = useUrlSearchParams(
    {},
    { disabled: !syncToUrl },
  );

  const [urlParamsMergeInitialValues, setUrlParamsMergeInitialValues] =
    useState(() => {
      if (!syncToUrl) {
        return {};
      }
      return genParams(syncToUrl, urlSearch, 'get');
    });

  useEffect(() => {
    if (syncToInitialValues) return;
    setUrlParamsMergeInitialValues({});
  }, [syncToInitialValues]);

  const getGenParams = useRefFunction(() => {
    return {
      ...urlSearch,
      ...extraUrlParams,
    };
  });

  useEffect(() => {
    if (!syncToUrl) return;
    setUrlSearch(genParams(syncToUrl, getGenParams(), 'set'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraUrlParams, getGenParams, syncToUrl]);

  return {
    urlSearch,
    setUrlSearch,
    urlParamsMergeInitialValues,
  };
}
