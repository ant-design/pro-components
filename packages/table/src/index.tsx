import type { IntlType } from '@ant-design/pro-provider';
import {
  ConfigProviderWrap,
  ConfigProvider,
  ConfigConsumer,
  createIntl,
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
import type { ProFieldValueType, RowEditableConfig } from '@ant-design/pro-utils';

import { FieldStatus, FieldIndexColumn } from '@ant-design/pro-field';
import ProTable from './Table';
import TableDropdown from './component/Dropdown';
import type { ListToolBarProps } from './component/ListToolBar';
import ListToolBar from './component/ListToolBar';

import Search from './Form';
import defaultRenderText from './defaultRender';
import type { ColumnsState } from './container';
import type { ActionType, ProColumns, ProColumnType, ProTableProps, RequestData } from './typing';
import EditableProTable from './EditableTable';

type ProColumnsValueType = ProFieldValueType;
type TableRowEditable<T> = RowEditableConfig<T>;

export type {
  ProTableProps,
  IntlType,
  ActionType,
  TableRowEditable,
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
  EditableProTable,
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
