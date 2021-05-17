import { getPageTitle } from '@ant-design/pro-layout';

const pageProps = {
  pathname: '/welcome',
  location: { pathname: '/welcome' },
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/PmY%24TNNDBI/logo.svg',
  navTheme: 'dark',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  menu: { locale: true },
  headerHeight: 48,
  title: 'Ant Design Pro',
  iconfontUrl: '',
  primaryColor: '#1890ff',
  prefixCls: 'ant-pro',
  siderWidth: 208,
  breadcrumb: {
    '/welcome/welcome': {
      path: '/welcome/welcome',
      name: 'two',
      locale: 'menu.welcome.one.two',
      key: '/welcome/welcome',
      routes: null,
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
      routes: null,
      children: [
        {
          path: '/welcome/welcome',
          name: 'two',
          locale: 'menu.welcome.one.two',
          key: '/welcome/welcome',
          routes: null,
          exact: true,
          pro_layout_parentKeys: [
            '/564f79ec010d02670f2cd38274f84017d6ddf17759857629a1399aed6bb20925',
            '/welcome',
          ],
        },
      ],
      pro_layout_parentKeys: ['/564f79ec010d02670f2cd38274f84017d6ddf17759857629a1399aed6bb20925'],
    },
    '/': {
      path: '/',
      name: 'welcome',
      children: [
        {
          path: '/welcome',
          name: 'one',
          locale: 'menu.welcome.one',
          key: '/welcome',
          routes: null,
          children: [
            {
              path: '/welcome/welcome',
              name: 'two',
              locale: 'menu.welcome.one.two',
              key: '/welcome/welcome',
              routes: null,
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
      routes: null,
      pro_layout_parentKeys: [],
    },
    '/demo': {
      path: '/demo',
      name: 'demo',
      locale: 'menu.demo',
      key: '/demo',
      routes: null,
      pro_layout_parentKeys: [],
    },
  },
  breadcrumbMap: new Map(),
};

describe('getPageTitle', () => {
  it('base', () => {
    const title = getPageTitle(pageProps);
    expect(title).toBe('one - Ant Design Pro');
  });

  it('base ignoreTitle', () => {
    const title = getPageTitle(pageProps, true);
    expect(title).toBe('one');
  });

  it('title=false', () => {
    const title = getPageTitle({
      ...pageProps,
      title: false,
    });
    expect(title).toBe('one');
  });

  it('base ignoreTitle', () => {
    const title = getPageTitle({ ...pageProps, pathname: undefined }, true);
    expect(title).toBe('welcome');
  });

  it('base title=Ant', () => {
    const title = getPageTitle({ ...pageProps, title: 'Ant' });
    expect(title).toBe('one - Ant');
  });

  it('base menu=undefined', () => {
    const title = getPageTitle({ ...pageProps, menu: undefined, title: 'Ant' });
    expect(title).toBe('one - Ant');
  });

  it('title is null ', () => {
    const title = getPageTitle({
      ...pageProps,
      title: undefined,
    });
    expect(title).toBe('one - Ant Design Pro');
  });

  it('breadcrumb is null ', () => {
    const title = getPageTitle({
      ...pageProps,
      breadcrumb: {},
    });
    expect(title).toBe('Ant Design Pro');
  });
});
