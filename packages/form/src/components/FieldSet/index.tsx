import React, { useImperativeHandle } from 'react';
import { Space, Input } from 'antd';
import type { FormItemProps, SpaceProps } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import type { GroupProps } from 'antd/lib/input';
import createField from '../../BaseForm/createField';

export type ProFormFieldSetProps<T = any> = {
  value?: T[];
  onChange?: (value: T[]) => void;
  space?: SpaceProps | GroupProps;
  valuePropName?: string;
  type?: 'space' | 'group';
  fieldProps?: any;
};

const FieldSetType = {
  space: Space,
  group: Input.Group,
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
  type = 'space',
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
        fieldProps: {
          ...(item?.props as any)?.fieldProps,
          onChange: (...restParams: any) => {
            (item.props as any)?.fieldProps?.onChange?.(...restParams);
            (item.props as any)?.onChange?.(...restParams);
            fieldSetOnChange(restParams[0], index);
          },
        },
        value: value[index],
        onChange: (itemValue: any) => {
          fieldSetOnChange(itemValue, index);
          (item as any).props.onChange?.(itemValue);
        },
      });
    }
    return item;
  });
  const Components = FieldSetType[type] as React.FC<SpaceProps>;

  /** Input.Group 需要配置 compact */
  const typeProps = { ...(type === 'group' ? { compact: true } : {}) };
  return (
    <Components {...typeProps} {...(space as SpaceProps)}>
      {list}
    </Components>
  );
};

const ProFormFieldSet: React.FC<FormItemProps & ProFormFieldSetProps> = React.forwardRef(
  ({ children, space, valuePropName, ...rest }, ref) => {
    useImperativeHandle(ref, () => {}, []);
    return (
      <FieldSet space={space} valuePropName={valuePropName} {...rest.fieldProps} {...rest}>
        {children}
      </FieldSet>
    );
  },
);

export default createField<FormItemProps & ProFormFieldSetProps>(ProFormFieldSet);
