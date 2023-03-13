import { useAntdTheme } from 'antd-style';
import { useOutlet } from 'dumi';
import LazyLoad from 'react-lazy-load';
import DemoProvider from '../../components/DemoProvider';

export default () => {
  const outlet = useOutlet();
  const token = useAntdTheme();
  if (location.href.includes('layout')) {
    return <DemoProvider>{outlet}</DemoProvider>;
  }
  return (
    <DemoProvider>
      <LazyLoad>
        <div
          style={{
            padding: 24,
            border: `1px solid ${token.colorSplit}`,
            margin: 24,
          }}
        >
          {outlet}
        </div>
      </LazyLoad>
    </DemoProvider>
  );
};
