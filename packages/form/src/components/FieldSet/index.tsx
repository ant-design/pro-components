import React, { useCallback, useImperativeHandle, useMemo } from 'react';
import { Space, Input } from 'antd';
import type { FormItemProps, SpaceProps } from 'antd';
import toArray from 'rc-util/lib/Children/toArray';
import type { GroupProps } from 'antd/lib/input';
import { createField } from '../../BaseForm/createField';
import { useRefFunction } from '@ant-design/pro-utils';
import { useGridHelpers } from '../../helpers';
import type { ProFormItemProps } from '../FormItem';

export type ProFormFieldSetProps<T = any> = {
  value?: T[];
  onChange?: (value: T[]) => void;
  space?: SpaceProps | GroupProps;
  valuePropName?: string;
  type?: 'space' | 'group';
  fieldProps?: any;
  transform?: ProFormItemProps['transform'];
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
  fieldProps,
  space,
  type = 'space',
  transform,
  ...rest
}) => {
  /**
   * 使用方法的饮用防止闭包
   *
   * @param fileValue
   * @param index
   */
  const fieldSetOnChange = useRefFunction((fileValue: any, index: number) => {
    const newValues = [...value];
    newValues[index] = defaultGetValueFromEvent(valuePropName || 'value', fileValue);

    onChange?.(newValues);
    fieldProps?.onChange?.(newValues);
  });

  let itemIndex = -1;
  const list = toArray(children).map((item: any) => {
    if (React.isValidElement(item)) {
      itemIndex += 1;
      const index = itemIndex;
      const isProFromItem =
        // @ts-ignore
        item?.type?.displayName === 'ProFormComponent' || item?.props?.readonly;
      const forkProps = isProFromItem
        ? {
            key: index,
            ignoreFormItem: true,
            ...((item.props as any) || {}),
            // 如果不是我们自定义的组件 fieldProps 无法识别
            fieldProps: {
              ...(item?.props as any)?.fieldProps,
              onChange: (...restParams: any) => {
                fieldSetOnChange(restParams[0], index);
              },
            },
            value: value[index],
            onChange: undefined,
          }
        : {
            key: index,
            ...((item.props as any) || {}),
            value: value[index],
            onChange: (itemValue: any) => {
              fieldSetOnChange(itemValue, index);
              (item as any).props.onChange?.(itemValue);
            },
          };
      return React.cloneElement(item, forkProps);
    }
    return item;
  });
  const Components = FieldSetType[type] as React.FC<SpaceProps>;

  const { RowWrapper } = useGridHelpers(rest);

  /** Input.Group 需要配置 compact */
  const typeProps = useMemo(() => ({ ...(type === 'group' ? { compact: true } : {}) }), [type]);

  const Wrapper: React.FC = useCallback(
    ({ children: dom }) => (
      <Components {...typeProps} {...(space as SpaceProps)} align="start">
        {dom}
      </Components>
    ),
    [Components, space, typeProps],
  );

  return <RowWrapper Wrapper={Wrapper}>{list}</RowWrapper>;
};

const ProFormFieldSet: React.FC<FormItemProps & ProFormFieldSetProps> = React.forwardRef(
  ({ children, space, valuePropName, ...rest }, ref) => {
    useImperativeHandle(ref, () => ({}));
    return (
      <FieldSet
        space={space}
        valuePropName={valuePropName}
        {...rest.fieldProps}
        // 把 fieldProps 里的重置掉
        onChange={undefined}
        {...rest}
      >
        {children}
      </FieldSet>
    );
  },
);

export default createField<FormItemProps & ProFormFieldSetProps>(ProFormFieldSet);
