import type React from 'react';
import type {
  BaseProFieldFC,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from '../provider';
import type {
  ProFieldRequestData,
  ProFieldTextType,
  ProFieldValueTypeInput,
} from '../utils';

export type ProFieldEmptyText = string | false;

/** 默认的 Field 需要实现的功能 */
export type ProFieldFC<T = {}> = React.ForwardRefRenderFunction<
  any,
  BaseProFieldFC & ProRenderFieldPropsType & T
>;

/** 轻量筛选的 field 属性 */
export type ProFieldLightProps = {
  lightLabel?: React.RefObject<{
    labelRef: React.RefObject<HTMLElement>;
    clearRef: React.RefObject<HTMLElement>;
  }>;
  labelTrigger?: boolean;
};

/** Value type by function */
export type ProFieldValueTypeFunction<T> = (item: T) => ProFieldValueTypeInput;

/** 传给各模式渲染函数（defaultRenderRead/Edit、pureRenderRead/Edit 等）的合并 props */
export type ProFieldRenderProps = Omit<
  ProFieldFCRenderProps,
  'text' | 'placeholder'
> &
  ProRenderFieldPropsType & {
    /** 从服务器读取选项 */
    request?: ProFieldRequestData;
    emptyText?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /**
     * #9002 内部标记：valueType 为缺省值（调用方未显式传入）时为 true。
     * 渲染函数依据它决定是否做「valueEnum/request → select」智能推断，
     * 显式传入的 valueType 永远优先。外部无需关心此字段。
     */
    isDefaultValueType?: boolean;
    [key: string]: any;
  };

/** ProField / PureProField 对外 props */
export type ProFieldPropsType = {
  text?: ProFieldTextType;
  valueType?: ProFieldValueTypeInput;
} & ProFieldRenderProps;
