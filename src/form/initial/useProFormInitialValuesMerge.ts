import { useMemo } from 'react';

/**
 * 合并 props.initialValues、request 返回的 initialData、URL 合并片段；
 * `syncToUrlAsImportant` 决定 URL 与 props 的覆盖顺序（与历史 `Form`/`BaseFormComponents` 一致）。
 */
export function useProFormInitialValuesMerge({
  syncToUrlAsImportant,
  initialValues,
  initialData,
  urlParamsMergeInitialValues,
}: {
  syncToUrlAsImportant: boolean;
  initialValues?: Record<string, any>;
  initialData?: Record<string, any>;
  urlParamsMergeInitialValues: Record<string, any>;
}) {
  const formInitialValues = useMemo(
    () =>
      syncToUrlAsImportant
        ? {
            ...initialValues,
            ...initialData,
            ...urlParamsMergeInitialValues,
          }
        : {
            ...urlParamsMergeInitialValues,
            ...initialValues,
            ...initialData,
          },
    [
      syncToUrlAsImportant,
      initialValues,
      initialData,
      urlParamsMergeInitialValues,
    ],
  );

  const componentsInitialValues = useMemo(
    () => ({
      ...initialValues,
      ...initialData,
    }),
    [initialValues, initialData],
  );

  return { formInitialValues, componentsInitialValues };
}
