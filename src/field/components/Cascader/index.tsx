import { LoadingOutlined } from '@ant-design/icons';
import type { RadioGroupProps } from 'antd';
import { Cascader, ConfigProvider } from 'antd';
import classNames from 'classnames';
import { useContext, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useIntl } from '../../../provider';
import { FieldLabel, objectToMap, proFieldParsingText } from '../../../utils';
import type { ProFieldFC } from '../../PureProField';
import type { FieldSelectProps } from '../Select';
import { useFieldFetchData } from '../Select/useFieldFetchData';

export type GroupProps = {
  options?: RadioGroupProps['options'];
  radioType?: 'button' | 'radio';
  placeholder?: string;
  variant?: 'outlined' | 'borderless' | 'filled';
} & FieldSelectProps;

/**
 * 级联选择组件
 *
 */
const FieldCascader: ProFieldFC<GroupProps> = ({
  radioType,
  placeholder,
  formItemRender,
  mode,
  render,
  label,
  light,
  variant,
  ref,
  ...rest
}) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const layoutClassName = getPrefixCls('pro-field-cascader');
  const [loading, options, fetchData] = useFieldFetchData(rest);
  const intl = useIntl();
  const cascaderRef = useRef(undefined);
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
    const dom = <>{proFieldParsingText(rest.text, objectToMap(rest.valueEnum || optionsValueEnum))}</>;

    if (render) {
      return render(rest.text, { mode, ...rest.fieldProps }, dom) ?? null;
    }
    return dom;
  }

  if (mode === 'edit') {
    let dom = (
      <Cascader
        ref={cascaderRef}
        allowClear={rest.fieldProps?.allowClear !== false}
        open={open}
        placeholder={placeholder || intl.getMessage('tableForm.selectPlaceholder', '请选择')}
        suffixIcon={loading ? <LoadingOutlined /> : undefined}
        variant={!light ? 'outlined' : 'borderless'}
        {...rest.fieldProps}
        className={classNames(rest.fieldProps?.className, layoutClassName)}
        options={options}
        onOpenChange={(isOpen) => {
          rest?.fieldProps?.onOpenChange?.(isOpen);
          setOpen(isOpen);
        }}
      />
    );

    if (formItemRender) {
      dom = formItemRender(rest.text, { mode, ...rest.fieldProps, options, loading }, dom) ?? null;
    }

    if (light) {
      const { disabled, value } = rest.fieldProps;
      const notEmpty = !!value && value?.length !== 0;
      return (
        <FieldLabel
          allowClear={false}
          disabled={disabled}
          downIcon={notEmpty || open ? false : undefined}
          label={label}
          style={
            notEmpty
              ? {
                  paddingInlineEnd: 0,
                }
              : undefined
          }
          value={notEmpty || open ? dom : null}
          variant={variant}
          onClick={() => {
            setOpen(true);
            rest?.fieldProps?.onOpenChange?.(true);
          }}
        />
      );
    }
    return dom;
  }

  return null;
};

export default FieldCascader;
