import {
  createCache,
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  parentSelectorLinter,
  StyleProvider,
} from '@ant-design/cssinjs';
import React from 'react';

const demoStyleCache = createCache();

const Page: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <StyleProvider
      cache={demoStyleCache}
      prefix="demo"
      linters={[logicalPropertiesLinter, legacyNotSelectorLinter, parentSelectorLinter]}
    >
      {children}
    </StyleProvider>
  );
};
export default Page;
