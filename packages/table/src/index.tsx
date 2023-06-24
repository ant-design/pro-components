import { FieldIndexColumn, FieldStatus } from '@ant-design/pro-field';
import type { IntlType } from '@ant-design/pro-provider';
import {
  arEGIntl,
  caESIntl,
  ConfigConsumer,
  createIntl,
  enUSIntl,
  esESIntl,
  frFRIntl,
  itITIntl,
  jaJPIntl,
  msMYIntl,
  ptBRIntl,
  ruRUIntl,
  thTHIntl,
  viVNIntl,
  zhCNIntl,
  zhTWIntl,
} from '@ant-design/pro-provider';
import type {
  ProFieldValueType,
  RowEditableConfig,
} from '@ant-design/pro-utils';
import type { DragTableProps } from './components/DragSortTable';
import DragSortTable from './components/DragSortTable';
import TableDropdown from './components/Dropdown';
import type { EditableFormInstance } from './components/EditableTable';
import EditableProTable from './components/EditableTable';
import Search from './components/Form';
import type { ListToolBarProps } from './components/ListToolBar';
import ListToolBar from './components/ListToolBar';
import type { ColumnsState } from './Store/Provide';
import ProTable from './Table';
import type {
  ActionType,
  ProColumns,
  ProColumnType,
  ProTableProps,
  RequestData,
} from './typing';

type ProColumnsValueType = ProFieldValueType;
type TableRowEditable<T> = RowEditableConfig<T>;

export type {
  ProTableProps,
  IntlType,
  ActionType,
  EditableFormInstance,
  TableRowEditable,
  ColumnsState,
  ProColumnsValueType,
  ProColumns,
  ProColumnType,
  RequestData,
  ListToolBarProps,
  DragTableProps,
};
export {
  TableDropdown,
  ListToolBar,
  FieldStatus as TableStatus,
  Search,
  EditableProTable,
  DragSortTable,
  ConfigConsumer as IntlConsumer,
  ConfigConsumer,
  zhCNIntl,
  FieldIndexColumn as IndexColumn,
  createIntl,
  arEGIntl,
  enUSIntl,
  viVNIntl,
  itITIntl,
  jaJPIntl,
  esESIntl,
  caESIntl,
  ruRUIntl,
  msMYIntl,
  zhTWIntl,
  frFRIntl,
  ptBRIntl,
  thTHIntl,
  ProTable,
};

export default ProTable;
