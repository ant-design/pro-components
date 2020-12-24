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
import useEditableArray from './useEditableArray';
import type { UseEditableMapType, UseEditableMapUtilType } from './useEditableMap';
import useEditableMap from './useEditableMap';
import useMountMergeState from './useMountMergeState';

/**
 * hooks
 */
import useDebounceFn from './hooks/useDebounceFn';
import usePrevious from './hooks/usePrevious';
import conversionSubmitValue from './conversionSubmitValue';
import transformKeySubmitValue from './transformKeySubmitValue';
import parseValueToMoment from './parseValueToMoment';
import useDeepCompareEffect from './hooks/useDeepCompareEffect';
import useDocumentTitle from './hooks/useDocumentTitle';

/**
 * type
 */
import type {
  ProSchema,
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
} from './typing';
import getFieldPropsOrFormItemProps from './getFieldPropsOrFormItemProps';
import DropdownFooter from './components/DropdownFooter';

export type {
  ProSchema,
  ProCoreActionType,
  ProSchemaComponentTypes,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  SearchTransformKeyFn,
  ProTableEditableFnType,
  RowEditableConfig,
  RowEditableType,
  ProFieldRequestData,
  UseEditableType,
  UseEditableUtilType,
  UseEditableMapType,
  UseEditableMapUtilType,
  ProFieldValueType,
  ProFieldValueEnumType,
  ProFieldValueObjectType,
};

export {
  omitBoolean,
  LabelIconTip,
  FilterDropdown,
  FieldLabel,
  InlineErrorFormItem,
  DropdownFooter,
  // function
  transformKeySubmitValue,
  conversionSubmitValue,
  parseValueToMoment,
  useDocumentTitle,
  isImg,
  isNil,
  isDropdownValueType,
  omitUndefined,
  omitUndefinedAndEmptyArr,
  pickProFormItemProps,
  isUrl,
  isBrowser,
  pickProProps,
  getFieldPropsOrFormItemProps,
  // hooks
  useEditableArray,
  useEditableMap,
  useDeepCompareEffect,
  usePrevious,
  useDebounceFn,
  useMountMergeState,
};
