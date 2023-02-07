import { Tabs } from 'antd';
import { createStyles } from 'antd-style';
import { history, useLocation } from 'dumi';
import NavbarExtra from 'dumi/theme-default/slots/NavbarExtra';
import { memo, type FC } from 'react';
import { shallow } from 'zustand/shallow';
import { activePathSel, useSiteStore } from '../../store/useSiteStore';

const useStyles = createStyles(({ css, responsive, token, stylish, prefixCls }) => {
  const prefix = `.${prefixCls}-tabs`;

  const marginHoriz = 16;
  const paddingVertical = 6;

  return {
    tabs: css`
      ${prefix}-tab + ${prefix}-tab {
        margin: ${marginHoriz}px 4px !important;
        padding: 0 12px !important;
      }

      ${prefix}-tab {
        color: ${token.colorTextSecondary};
        transition: background-color 100ms ease-out;

        &:first-child {
          margin: ${marginHoriz}px 4px ${marginHoriz}px 0;
          padding: ${paddingVertical}px 12px !important;
        }

        &:hover {
          color: ${token.colorText} !important;
          background: ${token.colorFillTertiary};
          border-radius: ${token.borderRadius}px;
        }
      }

      ${prefix}-nav {
        margin-bottom: 0;
      }

      ${responsive.mobile} {
        display: none;
      }
    `,

    link: css`
      ${stylish.resetLinkColor}
    `,
  };
});
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
