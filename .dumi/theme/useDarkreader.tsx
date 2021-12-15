import { useState, useEffect, useMemo } from 'react';
import * as DarkReader from '@umijs/ssr-darkreader';

export type Action = {
  toggle: () => void;
  collectCSS: () => Promise<string>;
};

export type Result = [boolean, Action];

export function useDarkreader(defaultDarken: boolean = false): [
  boolean,
  {
    toggle: () => void;
    collectCSS: () => Promise<string>;
  },
] {
  const {
    enable: enableDarkMode,
    disable: disableDarkMode,
    exportGeneratedCSS: collectCSS,
    setFetchMethod,
  } = DarkReader || {};

  const [isDark, setIsDark] = useState(defaultDarken);

  const defaultTheme = {
    brightness: 100,
    contrast: 90,
    sepia: 10,
  };

  const defaultFixes = {
    invert: [],
    css: '',
    ignoreInlineStyle: ['.react-switch-handle'],
    ignoreImageAnalysis: [],
    disableStyleSheetsProxy: true,
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.matchMedia === 'undefined') return;
    if (!DarkReader) {
      return () => null;
    }
    setFetchMethod(fetch);

    isDark ? enableDarkMode(defaultTheme, defaultFixes) : disableDarkMode();

    // unmount
    return () => {
      disableDarkMode();
    };
  }, [isDark]);

  const action = useMemo(() => {
    const toggle = () => setIsDark((prevState) => !prevState);

    return { toggle, collectCSS };
  }, [isDark]);

  return [isDark, action];
}
