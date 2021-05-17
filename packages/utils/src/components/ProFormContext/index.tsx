import type { NamePath } from 'antd/lib/form/interface';
import React from 'react';

const ProFormContext = React.createContext<{
  getFieldsFormatValue?: (nameList?: NamePath[] | true) => any;
  getFieldFormatValue?: (nameList?: NamePath) => any;
}>({});

export default ProFormContext;
