import React from 'react';

export const EditOrReadOnlyContext = React.createContext<{
  mode: 'edit' | 'read' | 'update';
}>({
  mode: 'edit',
});
