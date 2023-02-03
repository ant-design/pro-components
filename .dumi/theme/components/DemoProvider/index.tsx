import { StyleProvider } from 'antd-style';

export default ({ children }) => {
  return <StyleProvider prefix={'demo'}>{children}</StyleProvider>;
};
