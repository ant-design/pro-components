import React, { useImperativeHandle } from 'react';
import { Space } from 'antd';
import type { FormItemProps, SpaceProps } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import createField from '../../BaseForm/createField';

export type ProFormFieldSetProps<T = any> = {
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

const FieldSet: React.FC<ProFormFieldSetProps> = ({
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

  let itemIndex = -1;
  const list = toArray(children).map((item: any) => {
    if (React.isValidElement(item)) {
      itemIndex += 1;
      const index = itemIndex;
      return React.cloneElement(item, {
        key: index,
        ignoreFormItem: true,
        ...((item.props as any) || {}),
        value: value[index],
        onChange: (itemValue: any) => {
          fieldSetOnChange(itemValue, index);
          (item as any).props.onChange?.(itemValue);
        },
      });
    }
    return item;
  });
  return <Space {...space}>{list}</Space>;
};

const ProFormFieldSet: React.FC<
  FormItemProps & {
    space?: SpaceProps;
    fieldProps?: any;
  }
> = React.forwardRef(({ children, space, valuePropName, ...rest }, ref) => {
  useImperativeHandle(ref, () => {}, []);
  return (
    <FieldSet space={space} valuePropName={valuePropName} {...rest.fieldProps} {...rest}>
      {children}
    </FieldSet>
  );
});

export default createField<
  FormItemProps & {
    space?: SpaceProps;
  }
>(ProFormFieldSet);
