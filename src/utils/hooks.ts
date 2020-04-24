import { useEffect } from 'react';
import { isBrowser } from './utils';
import defaultSettings from '../defaultSettings';

export function useDocumentTitle(
  titleInfo: {
    title: string;
    id: string;
    pageName: string;
  },
  appDefaultTitle: string = defaultSettings.title,
) {
  const titleText =
    typeof titleInfo.pageName === 'string' ? titleInfo.title : appDefaultTitle;
  useEffect(() => {
    if (isBrowser() && titleText) {
      document.title = titleText;
    }
  }, [titleInfo.title]);
}
