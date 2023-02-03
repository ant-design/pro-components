import Previewer from 'dumi/theme-original/builtins/Previewer';

import DemoProvider from '../../components/DemoProvider';

export default (props) => (
  <DemoProvider>
    <Previewer {...props} />
  </DemoProvider>
);
