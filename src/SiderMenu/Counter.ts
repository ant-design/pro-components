import { useState, useRef } from 'react';
import { createContainer } from 'unstated-next';
import { MenuDataItem } from '../typings';

function useMenuCounter() {
  const [flatMenus, setFlatMenus] = useState<
    | {
        [key: string]: MenuDataItem;
      }
    | undefined
  >(undefined);
  const flatMenuKeys = useRef<string[]>([]);
  return {
    flatMenus,
    setFlatMenus,
    flatMenuKeys: flatMenuKeys.current,
    setFlatMenuKeys: (keys: string[]) => {
      flatMenuKeys.current = keys;
    },
  };
}

const MenuCounter = createContainer(useMenuCounter);
export default MenuCounter;
