import type { Key } from 'react';
import type { ProRequestData } from '../../utils';
import { useFetchData } from '../../utils';

export function useProFormRequestData<T, U = Record<string, any>>({
  request,
  params,
  formKey,
}: {
  request?: ProRequestData<T, U>;
  params?: U;
  formKey: Key;
}) {
  const [initialData, initialDataLoading] = useFetchData<T, U>({
    request,
    params,
    proFieldKey: formKey,
  });

  const shouldShowRequestSpin = !!(request && initialDataLoading);
  /** 与 BaseFormComponents 上 `loading` 组合：request 进行中且尚无 data */
  const requestPendingEmpty = !!(request && !initialData && initialDataLoading);

  return {
    initialData,
    initialDataLoading,
    shouldShowRequestSpin,
    requestPendingEmpty,
  };
}
