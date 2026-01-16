import { useMemo } from 'react';

export const useStyles = () => {
  const className = useMemo(() => 'dumi-logo', []);
  return className;
};
