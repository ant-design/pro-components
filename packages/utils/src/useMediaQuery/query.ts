import { useLayoutEffect, useState } from 'react';

export default function useMediaQuery(mediaQuery: string) {
  const isSsr = typeof window === 'undefined';

  const [matches, setMatches] = useState(() =>
    isSsr ? false : window.matchMedia(mediaQuery).matches,
  );
  useLayoutEffect(() => {
    if (isSsr) {
      return;
    }
    const mediaQueryList = window.matchMedia(mediaQuery);
    const listener = (e: any) => setMatches(e.matches);
    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, [mediaQuery]);
  return matches;
}
