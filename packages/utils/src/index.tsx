import { DropdownFooter } from './components/DropdownFooter';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FieldLabel } from './components/FieldLabel';
import { FilterDropdown } from './components/FilterDropdown';
import { InlineErrorFormItem } from './components/InlineErrorFormItem';
import { LabelIconTip } from './components/LabelIconTip';
import type { ProFormInstanceType } from './components/ProFormContext';
import { ProFormContext } from './components/ProFormContext';
import {
  conversionMomentValue,
  convertMoment,
  dateFormatterMap,
} from './conversionMomentValue';
import { dateArrayFormatter } from './dateArrayFormatter';
import { genCopyable } from './genCopyable';
import { getFieldPropsOrFormItemProps } from './getFieldPropsOrFormItemProps';
/** Hooks */
import {
  lighten,
  operationUnit,
  resetComponent,
  setAlpha,
  useStyle,
} from '@ant-design/pro-provider';
import { compareVersions } from './compareVersions';
import { coverToNewToken } from './compareVersions/coverToNewToken';
import { menuOverlayCompatible } from './compareVersions/menuOverlayCompatible';
import { openVisibleCompatible } from './compareVersions/openVisibleCompatible';
import { useDebounceFn } from './hooks/useDebounceFn';
import { useDebounceValue } from './hooks/useDebounceValue';
import {
  useDeepCompareEffect,
  useDeepCompareEffectDebounce,
} from './hooks/useDeepCompareEffect';
import useDeepCompareMemo from './hooks/useDeepCompareMemo';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import type { ProRequestData } from './hooks/useFetchData';
import { useFetchData } from './hooks/useFetchData';
import { useLatest } from './hooks/useLatest';
import { usePrevious } from './hooks/usePrevious';
import { useReactiveRef } from './hooks/useReactiveRef';
import { useRefCallback } from './hooks/useRefCallback';
import { useRefFunction } from './hooks/useRefFunction';
import { isBrowser } from './isBrowser';
import { isDeepEqualReact } from './isDeepEqualReact';
import { isDropdownValueType } from './isDropdownValueType';
import { isImg } from './isImg';
import { isNil } from './isNil';
import { isUrl } from './isUrl';
import { merge } from './merge';
import { nanoid } from './nanoid';
import { omitBoolean } from './omitBoolean';
import { omitUndefined } from './omitUndefined';
import { omitUndefinedAndEmptyArr } from './omitUndefinedAndEmptyArr';
import { parseValueToDay } from './parseValueToMoment';
import { pickProFormItemProps } from './pickProFormItemProps';
import { pickProProps } from './pickProProps';
import { objectToMap, proFieldParsingText } from './proFieldParsingText';
import { runFunction } from './runFunction';
import stringify from './stringify';
import { transformKeySubmitValue } from './transformKeySubmitValue';
import type {
  RowEditableConfig,
  RowEditableType,
  UseEditableType,
  UseEditableUtilType,
} from './useEditableArray';
import {
  editableRowByKey,
  recordKeyToString,
  useEditableArray,
} from './useEditableArray';
import type {
  UseEditableMapType,
  UseEditableMapUtilType,
} from './useEditableMap';
import { useEditableMap } from './useEditableMap';
import { useBreakpoint } from './useMediaQuery';
import { useMountMergeState } from './useMountMergeState';

export * from './typing';
export {
  DropdownFooter,
  ErrorBoundary,
  FieldLabel,
  FilterDropdown,
  InlineErrorFormItem,
  LabelIconTip,
  ProFormContext,
  compareVersions,
  conversionMomentValue,
  conversionMomentValue as conversionSubmitValue,
  convertMoment,
  coverToNewToken,
  dateArrayFormatter,
  dateFormatterMap,
  editableRowByKey,
  genCopyable,
  getFieldPropsOrFormItemProps,
  isBrowser,
  isDeepEqualReact,
  isDropdownValueType,
  isImg,
  isNil,
  isUrl,
  lighten,
  menuOverlayCompatible,
  merge,
  nanoid,
  objectToMap,
  omitBoolean,
  omitUndefined,
  omitUndefinedAndEmptyArr,
  openVisibleCompatible,
  operationUnit,
  parseValueToDay,
  pickProFormItemProps,
  pickProProps,
  proFieldParsingText,
  recordKeyToString,
  resetComponent,
  runFunction,
  setAlpha,
  stringify,
  // function
  transformKeySubmitValue,
  useBreakpoint,
  useDebounceFn,
  useDebounceValue,
  useDeepCompareEffect,
  useDeepCompareEffectDebounce,
  useDeepCompareMemo,
  useDocumentTitle,
  // hooks
  useEditableArray,
  useEditableMap,
  useFetchData,
  useLatest,
  useMountMergeState,
  usePrevious,
  useReactiveRef,
  useRefCallback,
  useRefFunction,
  useStyle,
};
export type {
  ProFormInstanceType,
  ProRequestData,
  RowEditableConfig,
  RowEditableType,
  UseEditableMapType,
  UseEditableMapUtilType,
  UseEditableType,
  UseEditableUtilType,
};
