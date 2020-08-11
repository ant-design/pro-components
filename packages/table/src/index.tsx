import {
  ConfigProvider,
  ConfigConsumer,
  createIntl,
  IntlType,
  zhCNIntl,
  enUSIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  ruRUIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
} from '@ant-design/pro-provider';
import { ProCoreActionType } from '@ant-design/pro-utils';
import { FieldStatus, ProFieldValueType, FieldIndexColumn } from '@ant-design/pro-field';

import ProTable, { ProColumns, ProColumnType, ProTableProps } from './Table';
import { RequestData } from './useFetchData';
import TableDropdown from './component/Dropdown';
import Search from './Form';
import defaultRenderText from './defaultRender';
import { ColumnsState } from './container';

type ProColumnsValueType = ProFieldValueType;

export type ActionType = ProCoreActionType;

export type {
  ProTableProps,
  IntlType,
  ColumnsState,
  ProColumnsValueType,
  ProColumns,
  ProColumnType,
  RequestData,
};

export {
  TableDropdown,
  FieldStatus as TableStatus,
  Search,
  ConfigProvider as IntlProvider,
  ConfigProvider,
  ConfigConsumer as IntlConsumer,
  ConfigConsumer,
  zhCNIntl,
  FieldIndexColumn as IndexColumn,
  defaultRenderText,
  createIntl,
  enUSIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  ruRUIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
};

export default ProTable;
