import React, { useContext, useMemo, useImperativeHandle, useRef } from 'react';
import type { RadioGroupProps } from 'antd';
import { ConfigProvider, Cascader } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import type { ProFieldFC } from '../../index';
import type { FieldSelectProps } from '../Select';
import { ObjToMap, proFieldParsingText, useFieldFetchData } from '../Select';
import { useIntl } from '@ant-design/pro-provider';

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: 'button' | 'radio';
} & FieldSelectProps;

/**
 * 单选组件
 *
 * @param param0
 * @param ref
 */
const FieldCascader: ProFieldFC<GroupProps> = (
  { radioType, renderFormItem, mode, render, ...rest },
  ref,
) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const layoutClassName = getPrefixCls('pro-field-cascader');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const intl = useIntl();
  const cascaderRef = useRef();

  useImperativeHandle(ref, () => ({
    ...(cascaderRef.current || {}),
    fetchData: () => fetchData(),
  }));

  const optionsValueEnum = useMemo<Record<string, any>>(() => {
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

    const traverseOptions = (_options: typeof options): Record<string, any> => {
      return _options?.length > 0
        ? _options?.reduce((pre, cur) => {
            const label = cur[labelPropsName],
              value = cur[valuePropsName],
              children = cur[childrenPropsName];
            return {
              ...pre,
              [value]: label,
              ...traverseOptions(children),
            };
          }, {})
        : {};
    };
    return traverseOptions(options);
  }, [options, rest.fieldProps?.fieldNames]);

  if (mode === 'read') {
    const dom = <>{proFieldParsingText(rest.text, ObjToMap(rest.valueEnum || optionsValueEnum))}</>;

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  if (mode === 'edit') {
    const dom = (
      <Cascader
        ref={cascaderRef}
        suffixIcon={loading ? <LoadingOutlined /> : undefined}
        placeholder={intl.getMessage('tableForm.selectPlaceholder', '请选择')}
        {...rest.fieldProps}
        className={classNames(rest.fieldProps?.className, layoutClassName)}
        options={options}
      />
    );
    if (renderFormItem) {
      return renderFormItem(rest.text, { mode, ...rest.fieldProps }, dom) || null;
    }
    return dom;
  }

  return null;
};

export default React.forwardRef(FieldCascader);
