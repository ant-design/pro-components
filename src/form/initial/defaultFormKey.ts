/** 未显式传入 `formKey` 时与历史实现共用，供 `useFetchData` 缓存键使用 */
export let requestFormCacheId = 0;

/** 与原先 `BaseForm` 内 `useEffect` 中 `requestFormCacheId += 0` 行为一致 */
export function bumpRequestFormCacheId() {
  requestFormCacheId += 0;
}
