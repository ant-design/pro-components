import { useEffect } from 'react';
import { isBrowser } from './utils';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    if (isBrowser()) {
      document.title = title;
    }
  }, [title]);
}
