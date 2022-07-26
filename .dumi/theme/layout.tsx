import dumiContext from '@umijs/preset-dumi/lib/theme/context';
import { ConfigProvider, Switch } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Layout from 'dumi-theme-default/src/layout';
import { useContext, useEffect, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { IRouteComponentProps, isBrowser } from 'umi';
import './layout.less';
import { useDarkreader } from './useDarkreader';

const DarkButton = () => {
  const colorScheme = useMemo(() => {
    if (!isBrowser()) {
      return 'light';
    }
    if ((window as any).HeadlessChrome) {
      return 'light';
    }

    return matchMedia?.('(prefers-color-scheme: dark)').matches && 'dark';
  }, []);

  const defaultDarken = useMemo(() => {
    if (!isBrowser()) {
      return 'light';
    }
    if ((window as any).HeadlessChrome) {
      return 'light';
    }
    return localStorage.getItem('procomponents_dark_theme') || colorScheme;
  }, []);

  const setColor = (isDarken: boolean) => {
    try {
      const theme = document.getElementsByTagName('meta')['theme-color'];
      theme.setAttribute('content', isDarken ? '#242525' : '#1890ff');
    } catch (error) {}
  };

  const [isDark, { toggle }] = useDarkreader(defaultDarken === 'dark');

  useEffect(() => {
    setColor(isDark);
  }, [isDark]);

  if (!isBrowser()) {
    return null;
  }
  if ((window as any).HeadlessChrome) {
    return null;
  }
  return (
    <Switch
      checkedChildren="🌜"
      unCheckedChildren="🌞"
      defaultChecked={defaultDarken === 'dark'}
      checked={isDark}
      onChange={(check) => {
        toggle();
        if (!check) {
          localStorage.setItem('procomponents_dark_theme', 'light');
        } else {
          localStorage.setItem('procomponents_dark_theme', 'dark');
        }
      }}
    />
  );
};

function loadJS(url, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = function () {
    callback?.();
  };
  script.src = url;

  document.getElementsByTagName('head')[0].appendChild(script);
}

const LayoutPage = ({ children, ...props }: IRouteComponentProps) => {
  const context = useContext(dumiContext);
  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    if ((window as any).HeadlessChrome) {
      return;
    }

    loadJS('https://www.googletagmanager.com/gtag/js?id=G-RMBLDHGL1N', function () {
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        // @ts-ignore
        dataLayer.push(arguments);
      }
      // @ts-ignore
      gtag('js', new Date());
      // @ts-ignore
      gtag('config', 'G-RMBLDHGL1N');
    });

    (function (h, o, t, j, a, r) {
      // @ts-ignore
      h.hj =
        // @ts-ignore
        h.hj ||
        function () {
          // @ts-ignore
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      // @ts-ignore
      h._hjSettings = { hjid: 2036108, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      // @ts-ignore
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }, []);

  const title = useMemo(() => {
    if (context.meta.title?.includes('-')) {
      return `${context.meta.title}`;
    }
    if (!context.meta.title) {
      return 'ProComponents - 模板组件';
    }
    return `${context.meta.title} - ProComponents`;
  }, [context]);

  return (
    <HelmetProvider>
      <ConfigProvider locale={zhCN}>
        <Layout {...props}>
          <div>
            <Helmet key="title">
              <title>{title}</title>
            </Helmet>
            <div key="children">{children}</div>
            <div
              style={{
                position: 'fixed',
                right: 8,
                top: 0,
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
              }}
              key="procomponents_dark_theme_view"
              className="procomponents_dark_theme_view"
            >
              {isBrowser() ? <DarkButton /> : null}
            </div>
          </div>
        </Layout>
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default LayoutPage;
