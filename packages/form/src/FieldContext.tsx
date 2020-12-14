import React from 'react';
import { FormItemProps } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';
import { ProFieldValueType, SearchTransformKeyFn } from '@ant-design/pro-utils';
import { GroupProps, FieldProps } from './interface';

export interface FiledContextProps {
  fieldProps?: FieldProps;
  formItemProps?: FormItemProps;
  groupProps?: GroupProps;
  setFieldValueType?: (
    name: NamePath,
    obj: {
      valueType?: ProFieldValueType;
      /**
       * 数据转化的地方
       */
      transform?: SearchTransformKeyFn;
    },
  ) => void;
}

const FieldContext = React.createContext<FiledContextProps>({});

export default FieldContext;
