import { useEffect } from 'react';
import { bumpRequestFormCacheId } from './defaultFormKey';

/** 与原先 `BaseForm` 内空 effect 行为一致（`requestFormCacheId += 0`） */
export function useRequestFormCacheBump() {
  useEffect(() => {
    bumpRequestFormCacheId();
  }, []);
}
