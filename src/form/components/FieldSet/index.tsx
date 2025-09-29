﻿import { toArray } from '@rc-component/util';
import type { SpaceProps } from 'antd';
import { Space } from 'antd';
import type { GroupProps } from 'antd/es/input';
import React, { useCallback, useImperativeHandle } from 'react';
import { runFunction, useRefFunction } from '../../../utils';
import type { LightWrapperProps } from '../../BaseForm';
import { useGridHelpers } from '../../helpers';
import type { ProFormItemProps } from '../FormItem';
import warpField from '../FormItem/warpField';

export type ProFormFieldSetProps<T = any> = {
  value?: T[];
  onChange?: (value: T[]) => void;
  space?: SpaceProps | GroupProps;
  valuePropName?: string;
  type?: 'space' | 'group';
  fieldProps?: any;
  convertValue?: ProFormItemProps['convertValue'];
  transform?: ProFormItemProps['transform'];
  children?: ((value: T[], props: ProFormFieldSetProps) => React.ReactNode) | React.ReactNode;
  lightProps?: LightWrapperProps;
};

const FieldSetType = {
  space: Space,
  group: Space.Compact,
};

function defaultGetValueFromEvent(valuePropName: string, ...args: any) {
  const event = args[0];
  if (event && event.target && valuePropName in event.target) {
    // @ts-ignore
    return (event.target as HTMLInputElement)[valuePropName];
  }
  return event;
}

const FieldSet: React.FC<ProFormFieldSetProps> = (props) => {
  const {
    children,
    value = [],
    valuePropName,
    onChange,
    fieldProps,
    space,
    type = 'space',
    transform,
    convertValue,
    lightProps,
    ...rest
  } = props;
  /**
   * 使用方法的引用防止闭包
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
  const list = toArray(runFunction(children, value, props)).map((item: any) => {
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
            value: value?.[index],
            onChange: undefined,
          }
        : {
            key: index,
            ...((item.props as any) || {}),
            value: value?.[index],
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

  const Wrapper: React.FC = useCallback(
    ({ children: dom }: { children?: React.ReactNode }) => (
      <Components {...(space as SpaceProps)} wrap align="start">
        {dom}
      </Components>
    ),
    [Components, space],
  );

  return <RowWrapper Wrapper={Wrapper}>{list}</RowWrapper>;
};

const BaseProFormFieldSet: React.FC<
  Omit<ProFormItemProps, 'children'> &
    ProFormFieldSetProps & {
      ref?: React.Ref<any>;
    }
> = ({ children, space, valuePropName, ref, ...rest }) => {
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
};

const ProFormFieldSet = warpField<Omit<ProFormItemProps, 'children'>>?.(BaseProFormFieldSet);

export default ProFormFieldSet as typeof BaseProFormFieldSet;
