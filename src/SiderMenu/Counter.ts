import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { MenuDataItem } from '../typings';

function useMenuCounter() {
  const [flatMenus, setFlatMenus] = useState<
    | {
        [key: string]: MenuDataItem;
      }
    | undefined
  >(undefined);
  const [flatMenuKeys, setFlatMenuKeys] = useState<string[]>([]);
  return {
    flatMenus,
    setFlatMenus,
    flatMenuKeys,
    setFlatMenuKeys,
  };
}

const MenuCounter = createContainer(useMenuCounter);
export default MenuCounter;
