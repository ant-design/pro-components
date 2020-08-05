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
import { FieldStatus, ProFieldValueType } from '@ant-design/pro-field';

import ProTable, { ProColumns, ActionType, ProTableProps, ColumnsState } from './Table';
import IndexColumn from './component/indexColumn';
import { RequestData } from './useFetchData';
import TableDropdown from './component/dropdown';
import Search from './form';
import defaultRenderText from './defaultRender';

type ProColumnsValueType = ProFieldValueType;

export type {
  ProTableProps,
  IntlType,
  ColumnsState,
  ProColumnsValueType,
  ProColumns,
  ActionType,
  RequestData,
};

export {
  IndexColumn,
  TableDropdown,
  FieldStatus as TableStatus,
  Search,
  ConfigProvider as IntlProvider,
  ConfigProvider,
  ConfigConsumer as IntlConsumer,
  ConfigConsumer,
  zhCNIntl,
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
