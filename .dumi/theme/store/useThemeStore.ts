import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface Store {
  themeMode: ThemeMode;
}
export const useThemeStore = create<Store>()(
  persist(
    () => ({
      themeMode: 'auto',
    }),
    { name: 'ANTD_STYLE_DOC_STORE' },
  ),
);
