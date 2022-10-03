import { intlMap as allIntlMap, useIntl } from '@ant-design/pro-provider';
import type { InputNumberProps } from 'antd';
import { version } from 'antd';
import { InputNumber, Popover } from 'antd';
import omit from 'omit.js';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useCallback, useMemo } from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/es/input-number/style';
import 'antd/es/popover/style';
import { compareVersions } from '@ant-design/pro-utils';
//----------------------

export type FieldMoneyProps = {
  text: number;
  moneySymbol?: boolean;
  locale?: string;
  placeholder?: any;
  customSymbol?: string;
  /** 自定义 Popover 的值，false 可以关闭他 */
  numberPopoverRender?:
    | ((props: InputNumberProps, defaultText: string) => React.ReactNode)
    | boolean;
  /**
   * NumberFormat 的配置，文档可以查看 mdn
   *
   * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   */
  numberFormatOptions?: {
    localeMatcher?: string;
    style?: string;
    currency?: string;
    currencyDisplay?: string;
    currencySign?: string;
    useGrouping?: boolean;
    minimumIntegerDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    minimumSignificantDigits?: number;
    maximumSignificantDigits?: number;
  };
};

const defaultMoneyIntl = new Intl.NumberFormat('zh-Hans-CN', {
  currency: 'CNY',
  style: 'currency',
});

const enMoneyIntl = {
  style: 'currency',
  currency: 'USD',
};

const ruMoneyIntl = {
  style: 'currency',
  currency: 'RUB',
};

const rsMoneyIntl = {
  style: 'currency',
  currency: 'RSD',
};

const msMoneyIntl = {
  style: 'currency',
  currency: 'MYR',
};

const ptMoneyIntl = {
  style: 'currency',
  currency: 'BRL',
};

const intlMap = {
  default: defaultMoneyIntl,
  'zh-Hans-CN': {
    currency: 'CNY',
    style: 'currency',
  },
  'en-US': enMoneyIntl,
  'ru-RU': ruMoneyIntl,
  'ms-MY': msMoneyIntl,
  'sr-RS': rsMoneyIntl,
  'pt-BR': ptMoneyIntl,
};

const getTextByLocale = (
  moneySymbol: string | false,
  paramsText: number | string | undefined,
  precision: number,
  config?: any,
) => {
  let moneyText: number | string | undefined = paramsText?.toString().replaceAll(',', '');
  if (typeof moneyText === 'string') {
    moneyText = Number(moneyText);
  }

  if (!moneyText && moneyText !== 0) return '';
  try {
    // readonly moneySymbol = false, unused currency
    return (
      new Intl.NumberFormat(moneySymbol || 'zh-Hans-CN', {
        ...(intlMap[moneySymbol || 'zh-Hans-CN'] || intlMap['zh-Hans-CN']),
        maximumFractionDigits: precision,
        ...config,
      })
        // fix: #6003 解决未指定货币符号时，金额文本格式化异常问题
        .format(moneyText)
        .substring(+(moneySymbol === false))
    );
  } catch (error) {
    return moneyText;
  }
};

const DefaultPrecisionCont = 2;

const InputNumberPopover = React.forwardRef<
  any,
  InputNumberProps & {
    open?: boolean;
    content?: (props: InputNumberProps) => React.ReactNode;
  } & {
    numberFormatOptions?: any;
    numberPopoverRender?: any;
  }
>(({ content, numberFormatOptions, numberPopoverRender, open, ...rest }, ref) => {
  const [value, onChange] = useMergedState<any>(() => rest.defaultValue, {
    value: rest.value,
    onChange: rest.onChange,
  });
  const dom = content?.({
    ...rest,
    value,
  });

  const props =
    compareVersions(version, '4.23.0') > -1
      ? {
          open: dom ? open : false,
        }
      : {
          visible: dom ? open : false,
        };

  return (
    <Popover
      placement="topLeft"
      {...props}
      trigger={['focus', 'click']}
      content={dom}
      getPopupContainer={(triggerNode) => {
        return triggerNode?.parentElement || document.body;
      }}
    >
      <InputNumber ref={ref} {...rest} value={value} onChange={onChange} />
    </Popover>
  );
});

/**
 * 金额组件
 *
 * @param FieldMoneyProps {
 *     text: number;
 *     moneySymbol?: string; }
 */
const FieldMoney: ProFieldFC<FieldMoneyProps> = (
  {
    text,
    mode: type,
    render,
    renderFormItem,
    fieldProps,
    proFieldKey,
    plain,
    valueEnum,
    placeholder,
    locale = fieldProps.customSymbol ?? 'zh-Hans-CN',
    customSymbol = fieldProps.customSymbol,
    numberFormatOptions = fieldProps?.numberFormatOptions,
    numberPopoverRender = fieldProps?.numberPopoverRender || false,
    ...rest
  },
  ref,
) => {
  const precision = fieldProps?.precision ?? DefaultPrecisionCont;
  let intl = useIntl();
  // 当手动传入locale时，应该以传入的locale为准，未传入时则根据全局的locale进行国际化
  if (locale && allIntlMap[locale]) {
    intl = allIntlMap[locale];
  }
  const moneySymbol = useMemo(() => {
    if (customSymbol) {
      return customSymbol;
    }
    const defaultText = intl.getMessage('moneySymbol', '￥');
    if (rest.moneySymbol === false || fieldProps.moneySymbol === false) {
      return undefined;
    }
    return defaultText;
  }, [customSymbol, fieldProps.moneySymbol, intl, rest.moneySymbol]);

  const getFormateValue = useCallback(
    (value?: string | number) => {
      const reg = new RegExp(
        `\\B(?=(\\d{${3 + Math.max(precision - DefaultPrecisionCont, 0)}})+(?!\\d))`,
        'g',
      );
      const [intS, floatS] = String(value).split('.');
      const resInt = intS.replace(reg, ',');
      let resFloat = '';
      if (floatS && precision > 0)
        resFloat = `.${floatS.slice(
          0,
          precision === undefined ? DefaultPrecisionCont : precision,
        )}`;

      return `${resInt}${resFloat}`;
    },
    [precision],
  );

  if (type === 'read') {
    const dom = (
      <span ref={ref}>
        {getTextByLocale(
          moneySymbol ? locale : false,
          text,
          precision,
          numberFormatOptions ?? fieldProps.numberFormatOptions,
        )}
      </span>
    );
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }

  if (type === 'edit' || type === 'update') {
    const dom = (
      <InputNumberPopover
        content={(props) => {
          if (numberPopoverRender === false) return;
          if (!props.value) return;

          const localeText = getTextByLocale(
            moneySymbol ? locale : false,
            `${getFormateValue(props.value)}`,
            precision,
            {
              ...numberFormatOptions,
              notation: 'compact',
            },
          );

          if (typeof numberPopoverRender === 'function') {
            return numberPopoverRender?.(props, localeText);
          }
          return localeText;
        }}
        ref={ref}
        precision={precision}
        // 删除默认min={0}，允许输入一个负数的金额，用户可自行配置min来限制是否允许小于0的金额
        formatter={(value) => {
          if (value && moneySymbol) {
            return `${moneySymbol} ${getFormateValue(value)}`;
          }
          return value!?.toString();
        }}
        parser={(value) => {
          if (moneySymbol && value) {
            return value.replace(new RegExp(`\\${moneySymbol}\\s?|(,*)`, 'g'), '');
          }
          return value!;
        }}
        placeholder={placeholder}
        {...omit(fieldProps, [
          'numberFormatOptions',
          'precision',
          'numberPopoverRender',
          'customSymbol',
          'moneySymbol',
          'visible',
          'open',
        ])}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldMoney);
