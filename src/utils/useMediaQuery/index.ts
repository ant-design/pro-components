import { theme } from 'antd';
import { useEffect, useState } from 'react';
import useMediaQuery from './query';

const { getDesignToken } = theme;
const token = getDesignToken();

export const MediaQueryEnum = {
  xs: {
    maxWidth: token.screenXSMax,
    matchMedia: `(max-width: ${token.screenXSMax}px)`,
  },
  sm: {
    minWidth: token.screenSMMin,
    maxWidth: token.screenSMMax,
    matchMedia: `(min-width: ${token.screenSMMin}px) and (max-width: ${token.screenSMMax}px)`,
  },
  md: {
    minWidth: token.screenMDMin,
    maxWidth: token.screenMDMax,
    matchMedia: `(min-width: ${token.screenMDMin}px) and (max-width: ${token.screenMDMax}px)`,
  },
  lg: {
    minWidth: token.screenLGMin,
    maxWidth: token.screenLGMax,
    matchMedia: `(min-width: ${token.screenLGMin}px) and (max-width: ${token.screenLGMax}px)`,
  },
  xl: {
    minWidth: token.screenXLMin,
    maxWidth: token.screenXLMax,
    matchMedia: `(min-width: ${token.screenXLMin}px) and (max-width: ${token.screenXLMax}px)`,
  },
  xxl: {
    minWidth: token.screenXXLMin,
    matchMedia: `(min-width: ${token.screenXXLMin}px)`,
  },
};

export type MediaQueryKey = keyof typeof MediaQueryEnum;

/**
 * loop query screen className
 * Array.find will throw a error
 * `Rendered more hooks than during the previous render.`
 * So should use Array.forEach
 */
export const getScreenClassName = () => {
  let queryKey: MediaQueryKey | undefined = undefined;
  // support ssr
  if (typeof window === 'undefined') {
    return queryKey;
  }
  const mediaQueryKey = (Object.keys(MediaQueryEnum) as MediaQueryKey[]).find(
    (key) => {
      const { matchMedia } = MediaQueryEnum[key];
      if (window.matchMedia(matchMedia).matches) {
        return true;
      }
      return false;
    },
  );
  queryKey = mediaQueryKey as unknown as MediaQueryKey;
  return queryKey;
};

const useBreakpoint = () => {
  const isMd = useMediaQuery(MediaQueryEnum.md.matchMedia);
  const isLg = useMediaQuery(MediaQueryEnum.lg.matchMedia);
  const isXxl = useMediaQuery(MediaQueryEnum.xxl.matchMedia);
  const isXl = useMediaQuery(MediaQueryEnum.xl.matchMedia);
  const isSm = useMediaQuery(MediaQueryEnum.sm.matchMedia);
  const isXs = useMediaQuery(MediaQueryEnum.xs.matchMedia);

  const [colSpan, setColSpan] = useState<
    keyof typeof MediaQueryEnum | undefined
  >(getScreenClassName());

  useEffect(() => {
    if (process.env.NODE_ENV === 'TEST') {
      setColSpan((process.env.USE_MEDIA as 'md') || 'md');
      return;
    }
    if (isXxl) {
      setColSpan('xxl');
      return;
    }
    if (isXl) {
      setColSpan('xl');
      return;
    }
    if (isLg) {
      setColSpan('lg');
      return;
    }
    if (isMd) {
      setColSpan('md');
      return;
    }
    if (isSm) {
      setColSpan('sm');
      return;
    }
    if (isXs) {
      setColSpan('xs');
      return;
    }
    setColSpan('md');
  }, [isMd, isLg, isXxl, isXl, isSm, isXs]);

  return colSpan;
};

export { useBreakpoint };
