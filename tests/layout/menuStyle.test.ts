import { describe, expect, it } from 'vitest';
import type { ProLayoutBaseMenuToken } from '../../src/layout/components/SiderMenu/style/menu';
import { genProLayoutBaseMenuStyle } from '../../src/layout/components/SiderMenu/style/menu';
import type { SiderMenuToken } from '../../src/layout/components/SiderMenu/style';
import { genSiderMenuStyle } from '../../src/layout/components/SiderMenu/style';

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

  it('uses theme tokens for the sider scrollbar (#9407)', () => {
    const style = genSiderMenuStyle({
      antCls: '.ant',
      proComponentsCls: '.pro',
      componentCls: '.pro-sider',
      colorFill: 'rgba(255, 255, 255, 0.18)',
      colorFillSecondary: 'rgba(255, 255, 255, 0.12)',
      borderRadiusLG: 8,
      proLayoutCollapsedWidth: 64,
      layout: { sider: {}, header: {} },
    } as SiderMenuToken);

    expect(style).toMatchObject({
      '.pro-layout': {
        '.pro-sider': {
          '&-scroll': {
            scrollbarColor: 'rgba(255, 255, 255, 0.18) transparent',
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              borderRadius: 8,
            },
          },
        },
      },
    });
  });
});
