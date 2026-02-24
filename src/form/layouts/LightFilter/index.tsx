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

type LightFilterItemElement = React.ReactElement<{
  secondary?: boolean;
  name?: string;
  label?: React.ReactNode;
  valuePropName?: string;
  fieldProps?: Record<string, any>;
  proFieldProps?: Record<string, any>;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}>;

const isSpaceOrCompact = (
  child: React.ReactElement | null | undefined,
): child is React.ReactElement =>
  child?.type === Space || child?.type === Space.Compact;

const cloneSpaceWithChildrenProps = (
  child: React.ReactElement,
  injectProps: (grandChild: React.ReactElement) => Record<string, any>,
) =>
  React.cloneElement(child, {
    children: React.Children.map(
      (child.props as { children?: React.ReactNode }).children,
      (grandChild) => {
        if (!React.isValidElement(grandChild) || !grandChild.props) {
          return grandChild;
        }
        return React.cloneElement(grandChild, injectProps(grandChild));
      },
    ),
  });

/**
 * 判断值是否为空（undefined、null、''、空数组视为空，用于归一化比较）
 */
const isValueEmpty = (v: any): boolean => {
  if (v === undefined || v === null || v === '') {
    return true;
  }
  if (Array.isArray(v)) {
    return v.length === 0;
  }
  return false;
};

/**
 * 对象/数组的结构相等比较（浅层，用于日期范围等对象值）
 */
const isShallowEqual = (a: any, b: any): boolean => {
  if (a === b) {
    return true;
  }
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  return keysA.every((k: string) => k in b && a[k] === b[k]);
};

const isValueChanged = (val: any, initVal: any): boolean => {
  if (isValueEmpty(val) !== isValueEmpty(initVal)) {
    return true;
  }
  if (isValueEmpty(val)) {
    return false;
  }
  if (Array.isArray(val) && Array.isArray(initVal)) {
    if (val.length !== initVal.length) {
      return true;
    }
    return val.some((v, i) => !isShallowEqual(v, initVal[i]));
  }
  if (val !== initVal) {
    if (
      typeof val === 'object' &&
      val !== null &&
      typeof initVal === 'object' &&
      initVal !== null
    ) {
      return !isShallowEqual(val, initVal);
    }
    return true;
  }
  return false;
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
    if (isValueChanged(values[key], initial[key])) {
      return true;
    }
  }
  return false;
};

const buildOutsideItemProps = (
  child: LightFilterItemElement,
  placement: TooltipPlacement | undefined,
  variant: 'outlined' | 'filled' | 'borderless',
) => {
  const fieldProps = (child.props.fieldProps ?? {}) as Record<string, any>;
  const newPlacement = (fieldProps.placement as TooltipPlacement) ?? placement;
  return {
    fieldProps: {
      ...fieldProps,
      placement: newPlacement,
      variant: 'borderless',
    },
    proFieldProps: {
      ...(child.props.proFieldProps ?? {}),
      light: true,
      label: child.props.label,
      variant,
    },
    variant,
  };
};

const buildCollapseItemProps = (
  child: LightFilterItemElement,
  moreValues: Record<string, any>,
  setMoreValues: React.Dispatch<React.SetStateAction<Record<string, any>>>,
  placement: TooltipPlacement | undefined,
  variant: 'outlined' | 'filled' | 'borderless',
) => {
  const {
    name,
    fieldProps = {},
    valuePropName = 'value',
  } = child.props as {
    name?: string;
    fieldProps?: Record<string, any>;
    valuePropName?: string;
  };
  const newPlacement =
    (fieldProps.placement as TooltipPlacement | undefined) ?? placement;

  const handleChange = (e: any) => {
    const value = e?.target ? e.target.value : e;
    setMoreValues((prev) => ({ ...prev, [name!]: value }));
    return false;
  };

  const newFieldProps: Record<string, any> = {
    ...fieldProps,
    placement: newPlacement,
    variant,
    ...(name !== undefined && name in moreValues
      ? { [valuePropName]: moreValues[name] }
      : {}),
    ...(name !== undefined ? { onChange: handleChange } : {}),
  };
  return { fieldProps: newFieldProps };
};

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

  const [moreValues, setMoreValues] = useState<Record<string, any>>(() => ({
    ...values,
  }));
  useEffect(() => {
    if (!open) {
      setMoreValues({ ...values });
    }
  }, [open, values]);

  const { collapseItems, outsideItems } = useMemo(() => {
    const collapseItemsArr: React.ReactNode[] = [];
    const outsideItemsArr: React.ReactNode[] = [];
    items.forEach((item) => {
      const el = item as LightFilterItemElement;
      if (el?.props?.secondary || collapse) {
        collapseItemsArr.push(item);
      } else {
        outsideItemsArr.push(item);
      }
    });
    return { collapseItems: collapseItemsArr, outsideItems: outsideItemsArr };
  }, [items, collapse]);

  const collapseLabelNode = useMemo(() => {
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
  }, [
    collapseLabel,
    collapse,
    lightFilterClassName,
    hashId,
    variant,
    size,
    intl,
  ]);

  const renderOutsideItem = (child: React.ReactNode, index: number) => {
    const el = child as LightFilterItemElement;
    if (!el?.props) {
      return child;
    }
    const itemKey = el.key ?? el.props.name ?? index;

    if (isSpaceOrCompact(el)) {
      const spaceExtraProps = {
        ...(el.type === Space && { size: 'small' as const }),
        style: {
          ...(el.props as { style?: React.CSSProperties }).style,
          ...(el.type === Space.Compact ? { gap: 0 } : {}),
        },
      };
      const clonedSpace = React.cloneElement(
        cloneSpaceWithChildrenProps(el, (grandChild) => {
          const grandEl = grandChild as LightFilterItemElement;
          const grandFieldProps =
            (grandEl.props?.fieldProps as Record<string, any>) ?? {};
          const grandPlacement =
            (grandFieldProps.placement as TooltipPlacement | undefined) ??
            placement;
          return {
            fieldProps: {
              ...grandFieldProps,
              placement: grandPlacement,
              variant: 'borderless',
            },
            proFieldProps: {
              ...(grandEl.props?.proFieldProps ?? {}),
              light: true,
              label: grandEl.props?.label,
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
          key={itemKey}
        >
          {clonedSpace}
        </div>
      );
    }

    return (
      <div
        className={clsx(`${lightFilterClassName}-item`, hashId)}
        key={itemKey}
      >
        {React.cloneElement(el, buildOutsideItemProps(el, placement, variant))}
      </div>
    );
  };

  const renderCollapseItem = (
    child: React.ReactNode,
    collapseIndex: number,
  ) => {
    const el = child as LightFilterItemElement;
    const itemKey = el?.key ?? el?.props?.name ?? `collapse-${collapseIndex}`;

    if (isSpaceOrCompact(el)) {
      const clonedSpace = cloneSpaceWithChildrenProps(el, (grandChild) => {
        const grandEl = grandChild as LightFilterItemElement;
        return buildCollapseItemProps(
          grandEl,
          moreValues,
          setMoreValues,
          placement,
          variant,
        );
      });
      return (
        <div
          className={clsx(`${lightFilterClassName}-line`, hashId)}
          key={itemKey}
        >
          {clonedSpace}
        </div>
      );
    }

    const { name } = (el as LightFilterItemElement)?.props ?? {};
    if (!name) {
      return (
        <div
          className={clsx(`${lightFilterClassName}-line`, hashId)}
          key={itemKey}
        >
          {child}
        </div>
      );
    }

    return (
      <div
        className={clsx(`${lightFilterClassName}-line`, hashId)}
        key={itemKey}
      >
        {React.cloneElement(
          el,
          buildCollapseItemProps(
            el,
            moreValues,
            setMoreValues,
            placement,
            variant,
          ),
        )}
      </div>
    );
  };

  const handleOpenChange = (changeOpen: boolean) => setOpen(changeOpen);

  const handleConfirm = () => {
    onValuesChange({ ...moreValues });
    setOpen(false);
  };

  const handleClear = () => {
    form?.resetFields();
    setMoreValues({ ...(initialValues ?? {}) });
    onValuesChange(initialValues ?? {}, { replace: true });
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
        {outsideItems.map(renderOutsideItem)}
        {collapseItems.length ? (
          <div
            className={clsx(`${lightFilterClassName}-item`, hashId)}
            key="more"
          >
            <FilterDropdown
              padding={24}
              open={open}
              onOpenChange={handleOpenChange}
              placement={placement}
              popoverProps={popoverProps}
              label={collapseLabelNode}
              footerRender={footerRender}
              footer={{ onConfirm: handleConfirm, onClear: handleClear }}
            >
              {collapseItems.map(renderCollapseItem)}
            </FilterDropdown>
          </div>
        ) : null}
      </div>
    </div>,
  );
};

const LightFilter = <T = Record<string, any>,>(props: LightFilterProps<T>) => {
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
  const [values, setValues] = useState<Record<string, any>>(() => ({
    ...initialValues,
  }));
  const formRef = useRef<ProFormInstance>();

  useImperativeHandle(userFormRef, () => formRef.current, [formRef.current]);

  const handleContainerValuesChange = (
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
      const allValues = formRef.current?.getFieldsValue() ?? newAllValues;
      onValuesChange(newValues as Partial<T>, allValues as T);
    }
  };

  const handleBaseFormValuesChange = (changedValues: any, allValues: any) => {
    setValues(allValues);
    onValuesChange?.(changedValues, allValues);
    formRef.current?.submit();
  };

  return (
    <BaseForm
      size={size}
      initialValues={initialValues}
      form={userForm}
      contentRender={(items, _submitter, form) => (
        <LightFilterContainer
          prefixCls={prefixCls}
          form={form}
          initialValues={initialValues}
          items={items?.flatMap((item: any) => {
            if (!item || !item?.type) {
              return item;
            }
            if (item.type === ProForm.Group) {
              return item.props.children;
            }
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
          onValuesChange={handleContainerValuesChange}
        />
      )}
      formRef={formRef}
      formItemProps={{ colon: false, labelAlign: 'left' }}
      fieldProps={{ style: { width: undefined } }}
      {...omit(rest, ['labelWidth'] as any[])}
      onValuesChange={handleBaseFormValuesChange}
    />
  );
};

export { LightFilter };
