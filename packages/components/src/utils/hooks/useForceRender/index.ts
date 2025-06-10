import { useCallback, useState } from 'react';

export default function useForceRender() {
  const [, setValue] = useState(true);

  const updateValue = useCallback(() => setValue((oldValue) => !oldValue), []);

  return updateValue;
}
