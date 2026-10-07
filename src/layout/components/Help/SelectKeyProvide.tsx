import React from 'react';

export const SelectKeyProvide = React.createContext<{
  selectedKey: string | undefined;
  setSelectedKey: (key: string | undefined) => void;
}>({
  selectedKey: undefined,
  setSelectedKey: () => {},
});
