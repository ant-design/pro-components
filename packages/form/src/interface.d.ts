export interface GroupProps {
  title?: React.ReactNode;
  style?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  titleRender?: (title: React.ReactNode) => React.ReactNode;
}
