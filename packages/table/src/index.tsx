import {
  ConfigProviderWrap,
  ConfigProvider,
  ConfigConsumer,
  createIntl,
  IntlType,
  arEGIntl,
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

import ProTable from './Table';
import TableDropdown from './component/Dropdown';
import ListToolBar, { ListToolBarProps } from './component/ListToolBar';

import Search from './Form';
import defaultRenderText from './defaultRender';
import { ColumnsState } from './container';
import { ProColumns, ProColumnType, ProTableProps, RequestData } from './typing';

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
  ListToolBarProps,
};

export {
  ConfigProviderWrap,
  TableDropdown,
  ListToolBar,
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
  arEGIntl,
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
