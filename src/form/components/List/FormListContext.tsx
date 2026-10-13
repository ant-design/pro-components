import type { FormListFieldData } from 'antd';
import React from 'react';
import type { NamePath } from '../../../utils/antdTypes';

export const FormListContext = React.createContext<
  (FormListFieldData & { listName: NamePath }) | Record<string, any>
>({});
