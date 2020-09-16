import { Form, Space } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SpaceProps } from 'antd/lib/space';
import toArray from 'rc-util/lib/Children/toArray';
import React from 'react';

type FieldSetProps<T = any> = {
  value?: T[];
  onChange?: (value: T[]) => void;
  space?: SpaceProps;
  valuePropName?: string;
};

export function defaultGetValueFromEvent(valuePropName: string, ...args: any) {
  const event = args[0];
  if (event && event.target && valuePropName in event.target) {
    return (event.target as HTMLInputElement)[valuePropName];
  }

  return event;
}

const FieldSet: React.FC<FieldSetProps> = ({
  children,
  value = [],
  valuePropName,
  onChange,
  space,
}) => {
  const fieldSetOnChange = (fileValue: any, index: number) => {
    if (!onChange) {
      return;
    }
    const newValues = [...value];
    newValues[index] = defaultGetValueFromEvent(valuePropName || 'value', fileValue);
    onChange(newValues);
  };

  const list = toArray(children).map((item, index) => {
    return React.cloneElement(item, {
      ...item.props,
      value: value[index],
      onChange: (itemValue: any) => {
        fieldSetOnChange(itemValue, index);
        if (item.props.onChange) {
          item.props.onChange(itemValue);
        }
      },
    });
  });

  return <Space {...space}>{list}</Space>;
};

const ProFromFieldSet: React.FC<
  FormItemProps & {
    space?: SpaceProps;
  }
> = ({ children, space, valuePropName, ...rest }) => {
  return (
    <Form.Item {...rest} valuePropName={valuePropName}>
      <FieldSet space={space} valuePropName={valuePropName}>
        {children}
      </FieldSet>
    </Form.Item>
  );
};

export default ProFromFieldSet;
