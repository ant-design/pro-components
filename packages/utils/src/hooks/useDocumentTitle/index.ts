import { useEffect } from 'react';
import { isBrowser } from '../../isBrowser';

export function useDocumentTitle(
  titleInfo: {
    title: string;
    id: string;
    pageName: string;
  },
  appDefaultTitle: string | false,
) {
  const titleText =
    typeof titleInfo.pageName === 'string' ? titleInfo.title : appDefaultTitle;
  useEffect(() => {
    if (isBrowser() && titleText) {
      document.title = titleText;
    }
  }, [titleInfo.title, titleText]);
}
