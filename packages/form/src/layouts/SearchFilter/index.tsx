import React from 'react';
import { Divider } from 'antd';
import { FormProps } from 'antd/lib/form/Form';
import BaseForm, { CommonFormProps } from '../../BaseForm';

export interface SearchFilterProps extends FormProps, CommonFormProps {}

const SearchFilter: React.FC<SearchFilterProps> = props => {
  return (
    <BaseForm
      formItemProps={{
        style: {
          width: 286,
        },
      }}
      contentRender={items =>
        items.map((item, index) => {
          if (index < items.length - 1) {
            return [
              item,
              <Divider style={{ marginTop: -8, marginBottom: 16 }} dashed />,
            ];
          }
          return item;
        })
      }
      groupProps={{
        titleStyle: {
          display: 'inline-block',
          marginRight: 16,
        },
        titleRender: title => `${title}:`,
      }}
      {...props}
    />
  );
};

export default SearchFilter;
