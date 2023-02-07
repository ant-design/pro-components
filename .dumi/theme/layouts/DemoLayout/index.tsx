import { useOutlet } from 'dumi';
import DemoProvider from '../../components/DemoProvider';

export default () => {
  const outlet = useOutlet();
  return <DemoProvider>{outlet}</DemoProvider>;
};
