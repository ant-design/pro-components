const compatibleLayout = (
  layout?: 'side' | 'top' | 'mix' | 'sidemenu' | 'topmenu',
) => {
  if (!layout) {
    return layout;
  }
  const layoutEnum = ['sidemenu', 'topmenu'];
  if (layoutEnum.includes(layout)) {
    return layout.replace('menu', '');
  }
  return layout;
};

export default compatibleLayout;
