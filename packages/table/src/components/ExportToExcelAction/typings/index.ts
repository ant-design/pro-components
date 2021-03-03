import type { TableColumnType } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { MenuInfo } from 'rc-menu/es/interface';
import type XLSX from 'xlsx';
import type { CellObject } from 'xlsx';
import type { ProColumns } from '../../../typing';

type ExportToExcelActionConfig<T = unknown, V = 'text'> = {
  getSheetDataSourceItemMeta?: (
    cellVal: unknown,
    col: ColumnType<T>,
    rowIndex: number,
  ) => CellObject | null;
  sheetName?: string;
  columns: TableColumnType<T>[] | ProColumns<T, V>[];
  dataSource: T[];
};

type ExportToExcelActionExport<T = unknown, V = 'text'> = (options: {
  info?: MenuInfo;
  configs: ExportToExcelActionConfig<T, V>[];
  xlsx: typeof XLSX;
  allColumns: ProColumns<T, V>[];
  columns: TableColumnType<T>[];
  dataSource?: T[];
}) => boolean | void;

type ExportToExcelActionProps<RecordType = unknown, ValueType = 'text'> = {
  fileName?: string;
  getSheetDataSourceItemMeta?: ExportToExcelActionConfig<
    RecordType,
    ValueType
  >['getSheetDataSourceItemMeta'];
  configs?: (
    columns: TableColumnType<RecordType>[] | ProColumns<RecordType, ValueType>[],
    dataSource: RecordType[],
    options: {
      isExportAll: boolean;
      allColumns: ProColumns<RecordType, ValueType>[];
      columns: TableColumnType<RecordType>[];
    },
  ) => Promise<ExportToExcelActionConfig<RecordType, ValueType>[]>;
  proColumns: ProColumns<RecordType, ValueType>[];
  columns: TableColumnType<RecordType>[];
  dataSource?: RecordType[];
  onExport?: ExportToExcelActionExport<RecordType, ValueType>;
};

export type { ExportToExcelActionExport, ExportToExcelActionProps, ExportToExcelActionConfig };
