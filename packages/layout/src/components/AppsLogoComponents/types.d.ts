export type AppsLogoComponentsAppList = {
  title: React.ReactNode;
  desc: React.ReactNode;
  icon: React.ReactNode;
  url: string;
  target?: string;
  children?: Omit<AppsLogoComponentsAppList, 'children'>;
}[];
