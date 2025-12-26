import { useEffect, useLayoutEffect, useState } from 'react';

export default function useMediaQuery(mediaQuery: string) {
  const isSsr = typeof window === 'undefined';

  const [matches, setMatches] = useState(() =>
    isSsr ? false : window.matchMedia(mediaQuery).matches,
  );

  // 在 SSR 环境中使用 useEffect，在客户端使用 useLayoutEffect
  // 这样可以避免 SSR 警告，同时在客户端保持同步更新
  // 使用条件表达式确保 hooks 调用顺序一致
  const EffectHook = isSsr ? useEffect : useLayoutEffect;

  EffectHook(() => {
    if (isSsr) {
      return;
    }
    const mediaQueryList = window.matchMedia(mediaQuery);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    // 使用最新的 addEventListener API
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [mediaQuery, isSsr]);

  return matches;
}
