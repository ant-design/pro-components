import { Tabs } from 'antd';
import { createStyles } from 'antd-style';
import { history, useLocation } from 'dumi';
import NavbarExtra from 'dumi/theme-default/slots/NavbarExtra';
import { memo, type FC } from 'react';
import { shallow } from 'zustand/shallow';
import { activePathSel, useSiteStore } from '../../store/useSiteStore';

const useStyles = createStyles(({ css, r, token, stylish, prefixCls }) => {
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

      ${r.mobile} {
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
  return (
    <>
      <Tabs
        onChange={(key) => {
          history.push(key);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 10);
        }}
        activeKey={location.pathname}
        className={styles.tabs}
        items={nav.map((item) => ({
          label: item.title,
          key: item.link,
        }))}
      />

      <NavbarExtra />
    </>
  );
};

export default memo(Navbar);
