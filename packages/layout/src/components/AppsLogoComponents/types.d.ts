export type AppsLogoComponentsAppItem = {
  title: React.ReactNode;
  desc: React.ReactNode;
  icon: React.ReactNode;
  url: string;
  target?: string;
  children?: Omit<AppsLogoComponentsAppItem, 'children'>[];
};

export type AppsLogoComponentsAppList = AppsLogoComponentsAppItem[];
