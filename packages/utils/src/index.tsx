import LabelIconTip from './components/LabelIconTip';

import isBrowser from './isBrowser';
import isImg from './isImg';
import isUrl from './isUrl';
/**
 * hooks
 */
import useDebounceFn from './hooks/useDebounceFn';
import usePrevious from './hooks/usePrevious';
import useDeepCompareEffect from './hooks/useDeepCompareEffect';
import useDocumentTitle from './hooks/useDocumentTitle';

export {
  LabelIconTip,
  useDocumentTitle,
  isImg,
  isUrl,
  isBrowser,
  usePrevious,
  useDebounceFn,
  useDeepCompareEffect,
};
