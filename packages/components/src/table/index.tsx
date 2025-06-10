import { FieldIndexColumn, FieldStatus } from '@ant-design/pro-field';
import type { IntlType } from '@ant-design/pro-provider';
import {
  ConfigConsumer,
  arEGIntl,
  caESIntl,
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
import type { ColumnsState } from './Store/Provide';
import ProTable from './Table';
import type { DragTableProps } from './components/DragSortTable';
import DragSortTable from './components/DragSortTable';
import TableDropdown from './components/Dropdown';
import type {
  EditableFormInstance,
  EditableProTableProps,
} from './components/EditableTable';
import EditableProTable from './components/EditableTable';
import { CellEditorTable } from './components/EditableTable/CellEditorTable';
import { RowEditorTable } from './components/EditableTable/RowEditorTable';
import Search from './components/Form';
import type { ListToolBarProps } from './components/ListToolBar';
import ListToolBar from './components/ListToolBar';
import type {
  ActionType,
  ProColumnType,
  ProColumns,
  ProTableProps,
  RequestData,
} from './typing';

type ProColumnsValueType = ProFieldValueType;
type TableRowEditable<T> = RowEditableConfig<T>;

export {
  CellEditorTable,
  ConfigConsumer,
  DragSortTable,
  EditableProTable,
  FieldIndexColumn as IndexColumn,
  ConfigConsumer as IntlConsumer,
  ListToolBar,
  ProTable,
  RowEditorTable,
  Search,
  TableDropdown,
  FieldStatus as TableStatus,
  arEGIntl,
  caESIntl,
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
};
export type {
  ActionType,
  ColumnsState,
  DragTableProps,
  EditableFormInstance,
  EditableProTableProps,
  IntlType,
  ListToolBarProps,
  ProColumnType,
  ProColumns,
  ProColumnsValueType,
  ProTableProps,
  RequestData,
  TableRowEditable,
};

export default ProTable;
