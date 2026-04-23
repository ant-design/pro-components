import type { CascaderProps, GetRef } from 'antd';
import { Cascader, ConfigProvider } from 'antd';
import React, {
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from '../../../provider';
import {
  isProFieldEditOnlyMode,
  isProFieldReadMode,
} from '../../internal/fieldMode';
import type { ProFieldFC } from '../../types';
import { useFieldFetchData } from '../Select';
import { FieldCascaderEdit } from './FieldCascaderEdit';
import { FieldCascaderLightEdit } from './FieldCascaderLightEdit';
import { FieldCascaderRead } from './FieldCascaderRead';
import type { GroupProps } from './types';

export type { GroupProps };

/**
 * 级联选择组件
 */
const FieldCascader: ProFieldFC<GroupProps> = (
  { placeholder, formItemRender, mode, render, label, light, variant, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const layoutClassName = getPrefixCls('pro-field-cascader');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const intl = useIntl();
  const cascaderRef = useRef<GetRef<typeof Cascader>>(null);
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      ...(cascaderRef.current || {}),
      fetchData: (keyWord: string) => fetchData(keyWord),
    }),
    [fetchData],
  );

  const optionsValueEnum = useMemo(() => {
    if (!isProFieldReadMode(mode)) return;
    const {
      value: valuePropsName = 'value',
      label: labelPropsName = 'label',
      children: childrenPropsName = 'children',
    } = rest.fieldProps?.fieldNames || {};

    const valuesMap = new Map();

    const traverseOptions = (_options: typeof options) => {
      if (!_options?.length) {
        return valuesMap;
      }

      const length = _options.length;
      let i = 0;
      while (i < length) {
        const cur = _options[i++];
        valuesMap.set(cur[valuePropsName], cur[labelPropsName]);
        traverseOptions(cur[childrenPropsName]);
      }
      return valuesMap;
    };

    return traverseOptions(options);
  }, [mode, options, rest.fieldProps?.fieldNames]);

  if (isProFieldReadMode(mode)) {
    return (
      <FieldCascaderRead
        placeholder={placeholder}
        formItemRender={formItemRender}
        mode={mode}
        render={render}
        label={label}
        light={light}
        variant={variant}
        optionsValueEnum={optionsValueEnum}
        {...rest}
      />
    );
  }

  if (isProFieldEditOnlyMode(mode)) {
    const editProps = {
      ...rest,
      placeholder,
      formItemRender,
      mode,
      render,
      label,
      variant,
      options: options as NonNullable<CascaderProps['options']>,
      loading,
      layoutClassName,
      open,
      setOpen,
      cascaderRef,
      intl,
    };
    if (light) {
      return <FieldCascaderLightEdit {...editProps} />;
    }
    return <FieldCascaderEdit {...editProps} />;
  }

  return null;
};

export default React.forwardRef(FieldCascader);
