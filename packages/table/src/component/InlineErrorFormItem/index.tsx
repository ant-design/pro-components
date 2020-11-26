import React from 'react';
import { Form, Popover } from 'antd';
import { FormItemProps } from 'antd/lib/form';

const InlineErrorFormItem: React.FC<FormItemProps> = (props) => {
  return (
    <Form.Item
      style={{
        margin: '-5px 0',
      }}
      preserve={false}
      // @ts-ignore
      _internalItemRender={{
        mark: 'pro_table_render',
        render: (
          inputProps: FormItemProps & {
            errors: any[];
          },
          {
            input,
            errorList,
            extra,
          }: {
            input: JSX.Element;
            errorList: JSX.Element;
            extra: JSX.Element;
          },
        ) => {
          const { errors } = inputProps;

          return (
            <Popover
              visible={errors.length < 1 ? false : undefined}
              placement="topLeft"
              content={<div>{errorList}</div>}
            >
              <div>
                {input}
                {extra}
              </div>
            </Popover>
          );
        },
      }}
      {...props}
    >
      {props.children}
    </Form.Item>
  );
};

export default InlineErrorFormItem;
