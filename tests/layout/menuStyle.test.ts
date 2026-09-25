import { describe, expect, it } from 'vitest';
import type { ProLayoutBaseMenuToken } from '../../src/layout/components/SiderMenu/style/menu';
import { genProLayoutBaseMenuStyle } from '../../src/layout/components/SiderMenu/style/menu';

const createToken = () =>
  ({
    antCls: '.ant',
    componentCls: '.pro-menu',
    layout: {
      header: {
        colorBgMenuElevated: '#header-popup',
      },
      sider: {
        colorBgMenuItemCollapsedElevated: '#sider-popup',
      },
    },
  }) as ProLayoutBaseMenuToken;

describe('SiderMenu style', () => {
  it('uses the collapsed sider popup background token', () => {
    const style = genProLayoutBaseMenuStyle(createToken(), 'inline');

    expect(style).toMatchObject({
      '.ant-menu-submenu-popup': {
        backgroundColor: '#sider-popup',
      },
    });
  });

  it('keeps the header popup background token in horizontal mode', () => {
    const style = genProLayoutBaseMenuStyle(createToken(), 'horizontal');

    expect(style).toMatchObject({
      '.ant-menu-submenu-popup': {
        backgroundColor: '#header-popup',
      },
    });
  });
});
