import { useCallback, useEffect, useMemo, useState } from 'react';
import { getHighlighter, Highlighter, Theme } from 'shiki-es';

import { languageMap } from './language';

export interface ShikiOptions {
  onInit?: (instance: Highlighter) => void;
  onLoadingChange?: (loading: boolean) => void;
}

const THEME: {
  dark: Theme;
  light: Theme;
} = {
  dark: 'github-dark',
  light: 'github-light',
};

export const useShiki = ({ onInit, onLoadingChange }: ShikiOptions) => {
  const [shikiInstance, setInstance] = useState<Highlighter>();

  const initHighlighter = async () => {
    onLoadingChange?.(true);
    const instance = await getHighlighter({
      langs: Object.keys(languageMap) as any,
      themes: Object.values(THEME),
    });

    setInstance(instance);

    onInit?.(instance);
    onLoadingChange?.(false);
  };

  // 初始化 Shiki HightLighter
  useEffect(() => {
    initHighlighter();
  }, []);

  const codeToHtml = useCallback(
    (text: string, language: any, isDarkMode: boolean) =>
      shikiInstance?.codeToHtml(text, {
        lang: language,
        theme: isDarkMode ? THEME.dark : THEME.light,
      }) || '',
    [shikiInstance],
  );

  return useMemo(() => ({ shiki: shikiInstance, codeToHtml }), [shikiInstance]);
};
