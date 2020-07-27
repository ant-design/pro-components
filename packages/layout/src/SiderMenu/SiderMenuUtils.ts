import { getMatchMenu, MenuDataItem } from '@umijs/route-utils';

// 获取当前的选中菜单
export const getSelectedMenuKeys = (pathname: string, menuData: MenuDataItem[]): string[] => {
  const menus = getMatchMenu(pathname, menuData);
  return menus.map((item) => item.key || item.path || '');
};
