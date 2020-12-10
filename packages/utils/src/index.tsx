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
import omitUndefinedAndEmptyArr from './omitUndefinedAndEmptyArr';
import pickProFormItemProps from './pickProFormItemProps';
import useEditableArray, {
  RowEditableConfig,
  RowEditableType,
  UseEditableType,
  UseEditableUtilType,
} from './useEditableArray';
import useEditableMap, { UseEditableMapType, UseEditableMapUtilType } from './useEditableMap';

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
import {
  ProSchema,
  ProSchemaValueEnumMap,
  ProSchemaValueEnumObj,
  ProSchemaComponentTypes,
  ProCoreActionType,
  SearchTransformKeyFn,
  ProTableEditableFnType,
} from './typing';

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
  UseEditableType,
  UseEditableUtilType,
  UseEditableMapType,
  UseEditableMapUtilType,
};

export {
  LabelIconTip,
  FilterDropdown,
  FieldLabel,
  InlineErrorFormItem,
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
  usePrevious,
  useDebounceFn,
  pickProProps,
  useDeepCompareEffect,
  // hooks
  useEditableArray,
  useEditableMap,
};
