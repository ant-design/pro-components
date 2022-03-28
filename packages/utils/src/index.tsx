import LabelIconTip from './components/LabelIconTip';
import FilterDropdown from './components/FilterDropdown';
import FieldLabel from './components/FieldLabel';
import InlineErrorFormItem from './components/InlineErrorFormItem';

import isBrowser from './isBrowser';
import isImg from './isImg';
import isUrl from './isUrl';
import isNil from './isNil';
import isDropdownValueType from './isDropdownValueType';
import pickProProps from './pickProProps';
import omitUndefined from './omitUndefined';
import omitBoolean from './omitBoolean';
import omitUndefinedAndEmptyArr from './omitUndefinedAndEmptyArr';
import pickProFormItemProps from './pickProFormItemProps';
import type {
  RowEditableConfig,
  RowEditableType,
  UseEditableType,
  UseEditableUtilType,
} from './useEditableArray';
import useEditableArray, { editableRowByKey, recordKeyToString } from './useEditableArray';
import type { UseEditableMapType, UseEditableMapUtilType } from './useEditableMap';
import useEditableMap from './useEditableMap';
import useMountMergeState from './useMountMergeState';

/** Hooks */
import useDebounceFn from './hooks/useDebounceFn';
import usePrevious from './hooks/usePrevious';
import conversionMomentValue, { dateFormatterMap, convertMoment } from './conversionMomentValue';
import transformKeySubmitValue from './transformKeySubmitValue';
import parseValueToMoment from './parseValueToMoment';
import useDeepCompareEffect, { useDeepCompareEffectDebounce } from './hooks/useDeepCompareEffect';
import useDocumentTitle from './hooks/useDocumentTitle';
import type { ProRequestData } from './hooks/useFetchData';
import useFetchData from './hooks/useFetchData';
import useLatest from './hooks/useLatest';

/** Type */
import type {
  ProSchema,
  ProFieldValueTypeWithFieldProps,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  ProSchemaComponentTypes,
  ProCoreActionType,
  SearchTransformKeyFn,
  ProTableEditableFnType,
  ProFieldValueType,
  ProFieldValueEnumType,
  ProFieldRequestData,
  ProFieldValueObjectType,
  ProFieldTextType,
  RequestOptionsType,
  ProFieldProps,
  ProSchemaValueType,
  SearchConvertKeyFn,
} from './typing';
import getFieldPropsOrFormItemProps from './getFieldPropsOrFormItemProps';
import DropdownFooter from './components/DropdownFooter';
import { runFunction } from './runFunction';
import type {
  BaseProFieldFC,
  ProFieldFCMode,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from '@ant-design/pro-provider';
import ErrorBoundary from './components/ErrorBoundary';
import dateArrayFormatter from './dateArrayFormatter';
import ProFormContext from './components/ProFormContext';
import isDeepEqualReact from './isDeepEqualReact';
import { arrayMoveImmutable } from './array-move';
import { merge } from './merge';
import { genCopyable } from './genCopyable';
import { useRefFunction } from './hooks/useRefFunction';
import { nanoid } from './nanoid';
import useDebounceValue from './hooks/useDebounceValue';

export type {
  SearchConvertKeyFn,
  RequestOptionsType,
  ProSchema,
  ProFieldValueTypeWithFieldProps,
  ProSchemaValueType,
  ProCoreActionType,
  ProSchemaComponentTypes,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  SearchTransformKeyFn,
  ProTableEditableFnType,
  RowEditableConfig,
  RowEditableType,
  ProRequestData,
  ProFieldRequestData,
  UseEditableType,
  UseEditableUtilType,
  UseEditableMapType,
  UseEditableMapUtilType,
  ProFieldValueType,
  ProRenderFieldPropsType,
  ProFieldFCRenderProps,
  ProFieldFCMode,
  BaseProFieldFC,
  ProFieldTextType,
  ProFieldValueEnumType,
  ProFieldValueObjectType,
  ProFieldProps,
};

export {
  LabelIconTip,
  ProFormContext,
  isDeepEqualReact,
  FilterDropdown,
  FieldLabel,
  arrayMoveImmutable,
  InlineErrorFormItem,
  DropdownFooter,
  ErrorBoundary,
  dateFormatterMap,
  // function
  transformKeySubmitValue,
  conversionMomentValue as conversionSubmitValue,
  conversionMomentValue,
  convertMoment,
  parseValueToMoment,
  genCopyable,
  useDocumentTitle,
  isImg,
  omitBoolean,
  isNil,
  merge,
  isDropdownValueType,
  omitUndefined,
  omitUndefinedAndEmptyArr,
  pickProFormItemProps,
  isUrl,
  isBrowser,
  pickProProps,
  runFunction,
  getFieldPropsOrFormItemProps,
  dateArrayFormatter,
  nanoid,
  editableRowByKey,
  recordKeyToString,
  // hooks
  useEditableArray,
  useEditableMap,
  useRefFunction,
  useDeepCompareEffect,
  usePrevious,
  useDebounceFn,
  useMountMergeState,
  useFetchData,
  useDeepCompareEffectDebounce,
  useLatest,
  useDebounceValue,
};
