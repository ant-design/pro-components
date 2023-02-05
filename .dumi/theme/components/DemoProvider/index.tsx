import { StyleProvider } from 'antd-style';

const Page: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <StyleProvider prefix={'demo'}>{children}</StyleProvider>;
};
export default Page;
