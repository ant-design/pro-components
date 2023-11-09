import { LoadingOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import {
  FieldLabel,
  objectToMap,
  proFieldParsingText,
} from '@ant-design/pro-utils';
import type { RadioGroupProps } from 'antd';
import { Cascader, ConfigProvider } from 'antd';
import classNames from 'classnames';
import React, {
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ProFieldFC } from '../../index';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select';

// 兼容代码-----------
import 'antd/lib/cascader/style';
//----------------------

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: 'button' | 'radio';
} & FieldSelectProps;

/**
 * 级联选择组件
 *
 * @param param0
 * @param ref
 */
const FieldCascader: ProFieldFC<GroupProps> = (
  { radioType, renderFormItem, mode, render, label, light, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const layoutClassName = getPrefixCls('pro-field-cascader');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const intl = useIntl();
  const cascaderRef = useRef();
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
    if (mode !== 'read') return;
    /**
     * Support cascader fieldNames
     *
     * @see https://ant.design/components/cascader-cn/#header
     */
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

  if (mode === 'read') {
    const dom = (
      <>
        {proFieldParsingText(
          rest.text,
          objectToMap(rest.valueEnum || optionsValueEnum),
        )}
      </>
    );

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, dom) ?? null;
    }
    return dom;
  }

  if (mode === 'edit') {
    let dom = (
      <Cascader
        bordered={!light}
        ref={cascaderRef}
        open={open}
        suffixIcon={loading ? <LoadingOutlined /> : undefined}
        placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
        allowClear={rest.fieldProps?.allowClear !== false}
        {...rest.fieldProps}
        onDropdownVisibleChange={(isOpen) => {
          rest?.fieldProps?.onDropdownVisibleChange?.(isOpen);
          setOpen(isOpen);
        }}
        className={classNames(rest.fieldProps?.className, layoutClassName)}
        options={options}
      />
    );

    if (renderFormItem) {
      dom =
        renderFormItem(
          rest.text,
          { mode, ...rest.fieldProps, options, loading },
          dom,
        ) ?? null;
    }

    if (light) {
      const { disabled, value } = rest.fieldProps;
      const notEmpty = !!value && value?.length !== 0;
      return (
        <FieldLabel
          label={label}
          disabled={disabled}
          bordered={rest.bordered}
          value={notEmpty || open ? dom : null}
          style={
            notEmpty
              ? {
                  paddingInlineEnd: 0,
                }
              : undefined
          }
          allowClear={false}
          downIcon={notEmpty || open ? false : undefined}
          onClick={() => {
            setOpen(true);
            rest?.fieldProps?.onDropdownVisibleChange?.(true);
          }}
        />
      );
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldCascader);
