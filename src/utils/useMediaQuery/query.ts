import { useEffect, useLayoutEffect, useState } from 'react';

/**
 * SSR 友好的 layoutEffect：模块加载时一次性决定走 useLayoutEffect 还是 useEffect。
 * 不能写成 `isSsr ? useEffect : useLayoutEffect` 放在组件函数里 —— 虽然
 * `typeof window` 在同一进程中恒定不变实际不会触发 hooks 顺序问题，但会被
 * `react-hooks/rules-of-hooks` lint 误报，且阅读时令人困惑。
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * 订阅一个 CSS media query，返回当前是否匹配。
 *
 * SSR 行为：
 *  - 服务端首次渲染恒定返回 false（避免 hydration mismatch，但首屏可能闪一下）。
 *  - 客户端 mount 后立即拿到真实值并触发一次 setState 更新。
 */
export default function useMediaQuery(mediaQuery: string): boolean {
  // SSR 期间 window 不存在，恒定 false；放弃在 useState 初始值里读
  // window.matchMedia，否则客户端 hydration 时会与服务端 false 渲染冲突。
  const [matches, setMatches] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQueryList = window.matchMedia(mediaQuery);

    // mount 后立刻同步一次真实值，弥补 SSR 期间初值恒为 false 的偏差
    setMatches(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    // 优先用现代 addEventListener；老 Safari (<14) / Edge Legacy 仅有 addListener
    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', listener);
      return () => mediaQueryList.removeEventListener('change', listener);
    }
    mediaQueryList.addListener(listener);
    return () => mediaQueryList.removeListener(listener);
  }, [mediaQuery]);

  return matches;
}
