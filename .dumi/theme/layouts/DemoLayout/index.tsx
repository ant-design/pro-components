import { useOutlet } from 'dumi';
import LazyLoad from 'react-lazy-load';
import DemoProvider from '../../components/DemoProvider';

export default () => {
  const outlet = useOutlet();
  return (
    <DemoProvider>
      <LazyLoad offset={300} height={500}>
        {outlet}
      </LazyLoad>
    </DemoProvider>
  );
};
