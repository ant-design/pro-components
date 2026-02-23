import { FilterOutlined } from '@ant-design/icons';
import { omit } from '@rc-component/util';
import type { FormInstance, FormProps, PopoverProps } from 'antd';
import { ConfigProvider, Space } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type { TooltipPlacement } from 'antd/lib/tooltip';
import { clsx } from 'clsx';
import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from '../../../provider';
import { FieldLabel, FilterDropdown } from '../../../utils';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import type { LightFilterFooterRender } from '../../typing';
import { ProForm } from '../ProForm';
import { useStyle } from './style';

const isSpaceOrCompact = (
  child: React.ReactElement | null | undefined,
): child is React.ReactElement =>
  child?.type === Space || child?.type === Space.Compact;

const cloneSpaceWithChildrenProps = (
  child: React.ReactElement,
  injectProps: (grandChild: React.ReactElement) => Record<string, unknown>,
) =>
  React.cloneElement(child, {
    children: React.Children.map(
      (child.props as { children?: React.ReactNode }).children,
      (grandChild) => {
        if (!React.isValidElement(grandChild) || !grandChild.props)
          return grandChild;
        return React.cloneElement(grandChild, injectProps(grandChild));
      },
    ),
  });

export type LightFilterProps<T, U = Record<string, any>> = {
  collapse?: boolean;
  /**
   * @name 收起的label dom
   *
   * @example collapseLabel={"收起"}
   */
  collapseLabel?: React.ReactNode;
  /**
   * @name 组件样式变体
   */
  variant?: 'outlined' | 'filled' | 'borderless';
  /**
   * @name 忽略rules，一般而言 LightFilter 应该不支持rules，默认是 false。
   */
  ignoreRules?: boolean;

  /**
   * @name 自定义 footerRender
   *
   * @example 自定义重置按钮
   * footerRender={(onConfirm,onClear)=>{ return <a onClick={onClear}>重置</a> }}
   */
  footerRender?: LightFilterFooterRender;

  /**
   * @name 支持配置弹出的位置
   * @default bottomLeft
   */
  placement?: TooltipPlacement;
  /**
   * @name 透传给内部 Popover 的属性（折叠态弹层）
   *
   * @description
   * LightFilter 在折叠态会使用 Popover 将筛选项渲染到 body 下；
   * 可通过该属性为弹层根节点添加自定义类名（如 classNames.root）以便做样式覆盖。
   *
   * @example
   * popoverProps={{ classNames: { root: 'my-lightfilter-popover' } } }
   */
  popoverProps?: Omit<
    PopoverProps,
    'children' | 'content' | 'trigger' | 'open' | 'onOpenChange' | 'placement'
  >;
} & Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T, U>;

/**
 * 判断值是否为空（undefined、null、''、空数组视为空，用于归一化比较）
 */
const isValueEmpty = (v: any): boolean => {
  if (v === undefined || v === null || v === '') return true;
  if (Array.isArray(v)) return v.length === 0;
  return false;
};

/**
 * 对象/数组的结构相等比较（浅层，用于日期范围等对象值）
 */
const isShallowEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  )
    return false;
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(
    (k) =>
      k in (b as object) &&
      (a as Record<string, unknown>)[k] === (b as Record<string, unknown>)[k],
  );
};

/**
 * 判断当前表单值是否与初始值不同（用于 effective 样式）
 * 空值（undefined、null、''、[]）归一化后再比较，避免清空输入后 effective 残留
 * 对象类型做结构比较，避免引用不等导致 effective 残留
 */
const isValuesDifferentFromInitial = (
  values: Record<string, any>,
  initialValues?: Record<string, any>,
): boolean => {
  const initial = initialValues ?? {};
  const keys = new Set([...Object.keys(values), ...Object.keys(initial)]);
  for (const key of keys) {
    const val = values[key];
    const initVal = initial[key];
    const valFilled = !isValueEmpty(val);
    const initFilled = !isValueEmpty(initVal);
    if (valFilled !== initFilled) return true;
    if (valFilled && Array.isArray(val) && Array.isArray(initVal)) {
      if (val.length !== initVal.length || val.some((v, i) => v !== initVal[i]))
        return true;
    } else if (valFilled && val !== initVal) {
      if (
        typeof val === 'object' &&
        val !== null &&
        typeof initVal === 'object' &&
        initVal !== null
      ) {
        if (!isShallowEqual(val, initVal)) return true;
      } else {
        return true;
      }
    }
  }
  return false;
};

const LightFilterContainer: React.FC<{
  items: React.ReactNode[];
  prefixCls: string;
  size?: SizeType;
  values: Record<string, any>;
  initialValues?: Record<string, any>;
  form?: FormInstance;
  onValuesChange: (
    values: Record<string, any>,
    options?: { replace?: boolean },
  ) => void;
  collapse?: boolean;
  collapseLabel?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'borderless';
  footerRender?: LightFilterFooterRender;
  placement?: TooltipPlacement;
  popoverProps?: Omit<
    PopoverProps,
    'children' | 'content' | 'trigger' | 'open' | 'onOpenChange' | 'placement'
  >;
}> = (props) => {
  const {
    items,
    prefixCls,
    size = 'middle',
    collapse,
    collapseLabel,
    onValuesChange,
    variant = 'borderless',
    values,
    initialValues,
    form,
    footerRender,
    placement,
    popoverProps,
  } = props;
  const intl = useIntl();
  const lightFilterClassName = `${prefixCls}-light-filter`;
  const { wrapSSR, hashId } = useStyle(lightFilterClassName);

  const [open, setOpen] = useState<boolean>(false);
  const [moreValues, setMoreValues] = useState<Record<string, any>>(() => {
    return { ...values };
  });
  useEffect(() => {
    setMoreValues({ ...values });
  }, [values]);

  const { collapseItems, outsideItems } = useMemo(() => {
    const collapseItemsArr: React.ReactNode[] = [];
    const outsideItemsArr: React.ReactNode[] = [];
    items.forEach((item: any) => {
      const { secondary } = item.props || {};
      if (secondary || collapse) {
        collapseItemsArr.push(item);
      } else {
        outsideItemsArr.push(item);
      }
    });
    return {
      collapseItems: collapseItemsArr,
      outsideItems: outsideItemsArr,
    };
  }, [items, collapse]);

  const renderCollapseLabelRender = () => {
    if (collapseLabel) {
      return collapseLabel;
    }
    if (collapse) {
      return (
        <FilterOutlined
          className={clsx(`${lightFilterClassName}-collapse-icon`, hashId)}
        />
      );
    }
    return (
      <FieldLabel
        variant={variant}
        size={size}
        label={intl.getMessage('form.lightFilter.more', '更多筛选')}
      />
    );
  };

  return wrapSSR(
    <div
      className={clsx(
        lightFilterClassName,
        hashId,
        `${lightFilterClassName}-${size}`,
        {
          [`${lightFilterClassName}-effective`]: isValuesDifferentFromInitial(
            values,
            initialValues,
          ),
        },
      )}
    >
      <div className={clsx(`${lightFilterClassName}-container`, hashId)}>
        {outsideItems.map((child: any, index) => {
          if (!child?.props) {
            return child;
          }
          const { key } = child;
          const { fieldProps } = child?.props || {};
          const newPlacement = fieldProps?.placement
            ? fieldProps?.placement
            : placement;

          if (isSpaceOrCompact(child)) {
            const spaceExtraProps = {
              ...(child.type === Space && { size: 'small' as const }),
              style: {
                ...(child.props as { style?: React.CSSProperties }).style,
                ...(child.type === Space.Compact ? { gap: 0 } : {}),
              },
            };
            const clonedSpace = React.cloneElement(
              cloneSpaceWithChildrenProps(child, (grandChild) => {
                const grandFieldProps = grandChild.props?.fieldProps || {};
                const grandPlacement =
                  grandFieldProps.placement ?? newPlacement;
                return {
                  fieldProps: {
                    ...grandFieldProps,
                    placement: grandPlacement,
                    variant: 'borderless',
                  },
                  proFieldProps: {
                    ...grandChild.props?.proFieldProps,
                    light: true,
                    label: grandChild.props?.label,
                    variant,
                  },
                  variant,
                };
              }),
              spaceExtraProps,
            );
            return (
              <div
                className={clsx(`${lightFilterClassName}-item`, hashId)}
                key={key || index}
              >
                {clonedSpace}
              </div>
            );
          }

          return (
            <div
              className={clsx(`${lightFilterClassName}-item`, hashId)}
              key={key || index}
            >
              {React.cloneElement(child, {
                fieldProps: {
                  ...child.props.fieldProps,
                  placement: newPlacement,
                  variant: 'borderless',
                },
                proFieldProps: {
                  ...child.props.proFieldProps,
                  light: true,
                  label: child.props.label,
                  variant,
                },
                variant,
              })}
            </div>
          );
        })}
        {collapseItems.length ? (
          <div
            className={clsx(`${lightFilterClassName}-item`, hashId)}
            key="more"
          >
            <FilterDropdown
              padding={24}
              open={open}
              onOpenChange={(changeOpen) => {
                setOpen(changeOpen);
              }}
              placement={placement}
              popoverProps={popoverProps}
              label={renderCollapseLabelRender()}
              footerRender={footerRender}
              footer={{
                onConfirm: () => {
                  onValuesChange({
                    ...moreValues,
                  });
                  setOpen(false);
                },
                onClear: () => {
                  form?.resetFields();
                  onValuesChange(initialValues ?? {}, { replace: true });
                },
              }}
            >
              {collapseItems.map((child: any, collapseIndex: number) => {
                const { key } = child;
                if (isSpaceOrCompact(child)) {
                  const clonedSpace = cloneSpaceWithChildrenProps(
                    child,
                    (grandChild) => {
                      const { name, fieldProps: grandFieldProps } =
                        grandChild.props;
                      if (!name) return {};
                      const newFieldProps = {
                        ...grandFieldProps,
                        onChange: (e: any) => {
                          const event = e as { target?: { value?: any } };
                          const value = event?.target ? event.target.value : e;
                          setMoreValues((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          return false;
                        },
                      };
                      if (name in moreValues) {
                        newFieldProps[
                          grandChild.props.valuePropName || 'value'
                        ] = moreValues[name];
                      }
                      return {
                        fieldProps: {
                          ...newFieldProps,
                          placement: grandFieldProps?.placement ?? placement,
                          variant,
                        },
                      };
                    },
                  );
                  return (
                    <div
                      className={clsx(`${lightFilterClassName}-line`, hashId)}
                      key={key || `space-${collapseIndex}`}
                    >
                      {clonedSpace}
                    </div>
                  );
                }
                const { name, fieldProps } = child.props;
                if (!name) {
                  return (
                    <div
                      className={clsx(`${lightFilterClassName}-line`, hashId)}
                      key={key}
                    >
                      {child}
                    </div>
                  );
                }
                const newFieldProps = {
                  ...fieldProps,
                  onChange: (e: any) => {
                    const event = e as { target?: { value?: any } };
                    const value = event?.target ? event.target.value : e;
                    setMoreValues((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                    return false;
                  },
                };
                if (name in moreValues) {
                  newFieldProps[child.props.valuePropName || 'value'] =
                    moreValues[name];
                }
                const newPlacement = fieldProps?.placement
                  ? fieldProps?.placement
                  : placement;
                return (
                  <div
                    className={clsx(`${lightFilterClassName}-line`, hashId)}
                    key={key}
                  >
                    {React.cloneElement(child, {
                      fieldProps: {
                        ...newFieldProps,
                        placement: newPlacement,
                        variant,
                      },
                    })}
                  </div>
                );
              })}
            </FilterDropdown>
          </div>
        ) : null}
      </div>
    </div>,
  );
};

function LightFilter<T = Record<string, any>>(props: LightFilterProps<T>) {
  const {
    size,
    collapse,
    collapseLabel,
    initialValues,
    onValuesChange,
    form: userForm,
    placement,
    formRef: userFormRef,
    variant,
    footerRender,
    popoverProps,
    ...rest
  } = omit(props, ['ignoreRules']);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-form');
  const [values, setValues] = useState<Record<string, any>>(() => {
    return { ...initialValues };
  });
  const formRef = useRef<ProFormInstance>();

  useImperativeHandle(userFormRef, () => formRef.current, [formRef.current]);

  return (
    <BaseForm
      size={size}
      initialValues={initialValues}
      form={userForm}
      contentRender={(items, _submitter, form) => {
        return (
          <LightFilterContainer
            prefixCls={prefixCls}
            form={form}
            initialValues={initialValues}
            items={items?.flatMap((item: any) => {
              if (!item || !item?.type) return item;
              if (item.type === ProForm.Group) return item.props.children;
              return item;
            })}
            size={size}
            variant={variant || 'borderless'}
            collapse={collapse}
            collapseLabel={collapseLabel}
            placement={placement}
            popoverProps={popoverProps}
            values={values || {}}
            footerRender={footerRender}
            onValuesChange={(
              newValues: Record<string, any>,
              options?: { replace?: boolean },
            ) => {
              const newAllValues = options?.replace
                ? newValues
                : { ...values, ...newValues };
              setValues(newAllValues);
              formRef.current?.setFieldsValue(newAllValues);
              formRef.current?.submit();
              if (onValuesChange) {
                // 第二参数应为表单当前全量值，与 antd Form.onValuesChange(changedValues, allValues) 一致
                const allValues =
                  formRef.current?.getFieldsValue() ?? newAllValues;
                onValuesChange(newValues as Partial<T>, allValues as T);
              }
            }}
          />
        );
      }}
      formRef={formRef}
      formItemProps={{
        colon: false,
        labelAlign: 'left',
      }}
      fieldProps={{
        style: {
          width: undefined,
        },
      }}
      {...omit(rest, ['labelWidth'] as any[])}
      onValuesChange={(_, allValues) => {
        setValues(allValues);
        onValuesChange?.(_, allValues);
        formRef.current?.submit();
      }}
    />
  );
}

export { LightFilter };
