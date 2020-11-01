import React, { useImperativeHandle } from 'react';
import { Space } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import { SpaceProps } from 'antd/lib/space';
import toArray from 'rc-util/lib/Children/toArray';
import { createField } from '../../BaseForm';

export type ProFromFieldSetProps<T = any> = {
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

const FieldSet: React.FC<ProFromFieldSetProps> = ({
  children,
  value = [],
  valuePropName,
  onChange,
  space,
}) => {
  const fieldSetOnChange = (fileValue: any, index: number) => {
    const newValues = [...value];
    newValues[index] = defaultGetValueFromEvent(valuePropName || 'value', fileValue);
    onChange?.(newValues);
  };

  const list = toArray(children).map((item, index) => {
    return React.cloneElement(item, {
      key: index,
      ignoreFormItem: true,
      ...item.props,
      value: value[index],
      onChange: (itemValue: any) => {
        fieldSetOnChange(itemValue, index);
        item.props.onChange?.(itemValue);
      },
    });
  });

  return <Space {...space}>{list}</Space>;
};

const ProFromFieldSet: React.FC<
  FormItemProps & {
    space?: SpaceProps;
  }
> = React.forwardRef(({ children, space, valuePropName, ...rest }, ref) => {
  useImperativeHandle(ref, () => {}, []);
  return (
    <FieldSet space={space} valuePropName={valuePropName} {...rest}>
      {children}
    </FieldSet>
  );
});

export default createField<
  FormItemProps & {
    space?: SpaceProps;
  }
>(ProFromFieldSet);
