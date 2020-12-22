import { useState } from 'react';
import { createContainer } from 'unstated-next';

function useMenuCounter() {
  const [flatMenuKeys, setFlatMenuKeys] = useState<string[]>([]);
  return {
    flatMenuKeys,
    setFlatMenuKeys,
  };
}

const MenuCounter = createContainer(useMenuCounter);
export default MenuCounter;
