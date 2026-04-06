import { useRefFunction } from '../../utils';
import { genParams } from '../sync/genParams';
import type { SyncToUrlConfig } from '../sync/genParams';

type FormRefWithFormat = {
  getFieldsFormatValue?: (allData?: true, omitNil?: boolean) => Record<string, any>;
};

export type UseProFormFinishHandlerParams = {
  formRef: React.MutableRefObject<FormRefWithFormat | undefined>;
  loading: boolean;
  setLoading: (next: boolean) => void;
  userOnFinish?: (values: any) => Promise<boolean | void> | boolean | void;
  syncToUrl: SyncToUrlConfig | undefined;
  extraUrlParams: Record<string, any>;
  urlSearch: Record<string, any>;
  setUrlSearch: (params: Record<string, any>) => void;
};

/**
 * antd Form onFinish：合并异步 onFinish、loading 与 syncToUrl 写回逻辑（含 #3547 URL 字段删除）。
 */
export function useProFormFinishHandler({
  formRef,
  loading,
  setLoading,
  userOnFinish,
  syncToUrl,
  extraUrlParams,
  urlSearch,
  setUrlSearch,
}: UseProFormFinishHandlerParams) {
  return useRefFunction(async () => {
    if (!userOnFinish) return;
    if (loading) return;
    try {
      setLoading(true);
      const finalValues = formRef?.current?.getFieldsFormatValue?.() || {};
      const response = userOnFinish(finalValues);
      if (
        response &&
        typeof response === 'object' &&
        typeof response.then === 'function'
      ) {
        try {
          await response;
        } catch (error) {
          setLoading(false);
          throw error;
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
      if (syncToUrl) {
        const syncToUrlParams = Object.keys(
          formRef?.current?.getFieldsFormatValue?.(true, false) || {},
        ).reduce(
          (pre, next) => ({
            ...pre,
            [next]: finalValues[next] ?? undefined,
          }),
          extraUrlParams,
        );
        Object.keys(urlSearch).forEach((key) => {
          if (
            syncToUrlParams[key] !== false &&
            syncToUrlParams[key] !== 0 &&
            !syncToUrlParams[key]
          ) {
            syncToUrlParams[key] = undefined;
          }
        });
        setUrlSearch(genParams(syncToUrl, syncToUrlParams, 'set'));
      }
    } catch {
      setLoading(false);
    }
  });
}
