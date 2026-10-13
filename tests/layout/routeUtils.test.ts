import { describe, expect, it, vi } from 'vitest';
import {
  getMatchMenu,
  transformRoute,
} from '../../src/layout/utils/routeUtils';

describe('layout route utilities', () => {
  it('formats relative routes and resolves dynamic breadcrumbs', () => {
    const formatMessage = vi.fn(
      ({ defaultMessage }) => `i18n:${defaultMessage}`,
    );
    const { breadcrumb, menuData } = transformRoute(
      [
        {
          path: '/users',
          name: 'users',
          routes: [{ path: ':id', name: 'detail' }],
        },
      ],
      true,
      formatMessage,
    );

    expect(menuData[0]).toMatchObject({ path: '/users', name: 'i18n:users' });
    expect(menuData[0].children?.[0]).toMatchObject({
      path: '/users/:id',
      name: 'i18n:detail',
    });
    expect(breadcrumb.get('/users/42')?.path).toBe('/users/:id');
    expect(
      getMatchMenu('/users/42', menuData, true).map((item) => item.path),
    ).toEqual(['/users', '/users/:id']);
  });

  it('gives pathless sibling layouts stable unique keys', () => {
    const { menuData } = transformRoute(
      [
        { layout: 'mix', name: 'first', routes: [{ path: '/first' }] },
        { layout: 'top', name: 'second', routes: [{ path: '/second' }] },
      ],
      false,
    );

    expect(menuData.map((item) => item.key)).toEqual([
      'route-/-0',
      'route-/-1',
    ]);
  });

  it('flattens flatMenu children and omits hidden menu branches', () => {
    const { breadcrumb, menuData } = transformRoute(
      [
        {
          path: '/group',
          flatMenu: true,
          routes: [{ path: 'visible', name: 'visible' }],
        },
        { path: '/hidden', name: 'hidden', hideInMenu: true },
      ],
      false,
    );

    expect(menuData).toHaveLength(1);
    expect(menuData[0]).toMatchObject({
      path: '/group/visible',
      name: 'visible',
    });
    expect(breadcrumb.get('/hidden')?.name).toBe('hidden');
  });
});
