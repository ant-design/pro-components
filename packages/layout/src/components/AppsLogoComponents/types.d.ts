export type AppsLogoComponentsAppItem = {
  title: React.ReactNode;
  desc: React.ReactNode;
  icon: React.ReactNode;
  url: string;
  target?: string;
  click?: (item: AppsLogoComponentsAppItem) => void;
  children?: Omit<AppsLogoComponentsAppItem, 'children'>[];
};

export type AppsLogoComponentsAppList = AppsLogoComponentsAppItem[];
