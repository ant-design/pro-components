import { getPageTitle } from '@ant-design/pro-components';
import { cleanup } from '@testing-library/react';

const pageProps = {
  pathname: '/welcome',
  location: { pathname: '/welcome' },
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
  layout: 'side',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixSiderbar: false,
  menu: { locale: true },
  title: 'Ant Design Pro',
  iconfontUrl: '',
  colorPrimary: '#1677FF',
  prefixCls: 'ant-pro',
  siderWidth: 208,
  breadcrumb: {
    '/welcome/welcome': {
      path: '/welcome/welcome',
      name: 'two',
      locale: 'menu.welcome.one.two',
      key: '/welcome/welcome',

      exact: true,
      pro_layout_parentKeys: [
        '/564f79ec010d02670f2cd38274f84017d6ddf17759857629a1399aed6bb20925',
        '/welcome',
      ],
    },
    '/welcome': {
      path: '/welcome',
      name: 'one',
      locale: 'menu.welcome.one',
      key: '/welcome',
      routes: [
        {
          path: '/welcome/welcome',
          name: 'two',
          locale: 'menu.welcome.one.two',
          key: '/welcome/welcome',

          exact: true,
          pro_layout_parentKeys: [
            '/564f79ec010d02670f2cd38274f84017d6ddf17759857629a1399aed6bb20925',
            '/welcome',
          ],
        },
      ],
      pro_layout_parentKeys: [
        '/564f79ec010d02670f2cd38274f84017d6ddf17759857629a1399aed6bb20925',
      ],
    },
    '/': {
      path: '/',
      name: 'welcome',
      routes: [
        {
          path: '/welcome',
          name: 'one',
          locale: 'menu.welcome.one',
          key: '/welcome',
          routes: [
            {
              path: '/welcome/welcome',
              name: 'two',
              locale: 'menu.welcome.one.two',
              key: '/welcome/welcome',
              exact: true,
              pro_layout_parentKeys: [
                '/564f79ec010d02670f2cd38274f84017d6ddf17759857629a1399aed6bb20925',
                '/welcome',
              ],
            },
          ],
          pro_layout_parentKeys: [
            '/564f79ec010d02670f2cd38274f84017d6ddf17759857629a1399aed6bb20925',
          ],
        },
      ],
      locale: 'menu.welcome',
      key: '/564f79ec010d02670f2cd38274f84017d6ddf17759857629a1399aed6bb20925',
      pro_layout_parentKeys: [],
    },
    '/demo': {
      path: '/demo',
      name: 'demo',
      locale: 'menu.demo',
      key: '/demo',
      pro_layout_parentKeys: [],
    },
  },
  breadcrumbMap: new Map(),
};

afterEach(() => {
  cleanup();
});

describe('getPageTitle', () => {
  it('🗒️ base', () => {
    const title = getPageTitle(pageProps);
    expect(title).toBe('one - Ant Design Pro');
  });

  it('🗒️ base ignoreTitle', () => {
    const title = getPageTitle(pageProps, true);
    expect(title).toBe('one');
  });

  it('🗒️ title=false', () => {
    const title = getPageTitle({
      ...pageProps,
      title: false,
    });
    expect(title).toBe('one');
  });

  it('🗒️ base ignoreTitle', () => {
    const title = getPageTitle({ ...pageProps, pathname: undefined }, true);
    expect(title).toBe('welcome');
  });

  it('🗒️ base title=Ant', () => {
    const title = getPageTitle({ ...pageProps, title: 'Ant' });
    expect(title).toBe('one - Ant');
  });

  it('🗒️ base menu=undefined', () => {
    const title = getPageTitle({ ...pageProps, menu: undefined, title: 'Ant' });
    expect(title).toBe('one - Ant');
  });

  it('🗒️ title is null ', () => {
    const title = getPageTitle({
      ...pageProps,
      title: undefined,
    });
    expect(title).toBe('one');
  });

  it('🗒️ breadcrumb is null ', () => {
    const title = getPageTitle({
      ...pageProps,
      breadcrumb: {},
    });
    expect(title).toBe('Ant Design Pro');
  });
});
