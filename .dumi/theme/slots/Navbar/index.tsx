import { Tabs, theme } from 'antd';
import { history, useLocation } from 'dumi';
import NavbarExtra from 'dumi/theme-default/slots/NavbarExtra';
import { memo, useEffect, useMemo, useRef, type FC } from 'react';
import { shallow } from 'zustand/shallow';
import { activePathSel, useSiteStore } from '../../store/useSiteStore';
import useResponsive from '../../utils/useResponsive';
import { useThemeMode } from '../../utils/useThemeMode';

const useStyles = () => {
  const { isDarkMode } = useThemeMode();

  const classNames = useMemo(
    () => ({
      tabs: 'dumi-navbar-tabs',
      link: 'dumi-navbar-link',
    }),
    [],
  );

  return {
    styles: classNames,
    theme: { appearance: isDarkMode ? 'dark' : 'light' },
  };
};
const Navbar: FC = () => {
  const { styles } = useStyles();
  const nav = useSiteStore((s) => s.navData, shallow);
  const location = useLocation();

  const activeKey = location.pathname.replace('/en-US/', '').replace('/', '').split('/').shift();

  return (
    <>
      <Tabs
        onChange={(key) => {
          history.push(
            nav.find((item) => item.link.replace('/en-US/', '').replace('/', '') === key)?.link ||
              '/',
          );
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 10);
        }}
        activeKey={activeKey}
        className={styles.tabs}
        items={nav.map((item) => ({
          label: item.title,
          link: item.link,
          key: item.link.replace('/en-US/', '').replace('/', ''),
        }))}
      />

      <NavbarExtra />
    </>
  );
};

export default memo(Navbar);
