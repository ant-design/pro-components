import React from 'react';
import { Divider } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import BaseForm, { CommonFormProps } from '../../BaseForm';

export interface SearchFilterProps extends FormProps, CommonFormProps {
  // TODO
}
const SearchFilter: React.FC<SearchFilterProps> = props => {
  return (
    <BaseForm
      formItemProps={{
        style: {
          width: 286,
        },
      }}
      contentRender={items => {
        return items.map((item, index) => {
          if (index < items.length - 1) {
            return [item, <Divider dashed />];
          }
          return item;
        });
      }}
      {...props}
    />
  );
};

export default SearchFilter;
