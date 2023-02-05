//@ts-ignore
import Previewer from 'dumi/theme-original/builtins/Previewer';

import DemoProvider from '../../components/DemoProvider';

const Page: React.FC = (props) => (
  <DemoProvider>
    <Previewer {...props} />
  </DemoProvider>
);

export default Page;
