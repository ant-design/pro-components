import React from 'react';
import { FormProps } from 'antd/lib/form/Form';
import BaseForm, { CommonFormProps } from '../../BaseForm';

export interface SearchFilterProps extends FormProps, CommonFormProps {
  // TODO
}
const SearchFilter: React.FC<SearchFilterProps> = props => {
  return (
    <BaseForm
      {...props}
      contentRender={items => {
        return <>{items}</>;
      }}
    />
  );
};

export default SearchFilter;
