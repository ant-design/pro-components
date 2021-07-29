import type { ProColumns } from '../../../typing';
import type { TableColumnType } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type XLSX from 'xlsx';
import type { CellObject } from 'xlsx';

type ExportToExcelActionConfig<DateType = unknown, ValueType = 'text'> = {
  getSheetDataSourceItemMeta?: (
    cellVal: unknown,
    col: ColumnType<DateType>,
    rowIndex: number,
  ) => CellObject | null;
  sheetName?: string;
  columns: TableColumnType<DateType>[] | ProColumns<DateType, ValueType>[];
  dataSource: DateType[];
};

type ExportToExcelActionExport<T = unknown, V = 'text'> = (options: {
  configs: ExportToExcelActionConfig<T, V>[];
  xlsx: typeof XLSX;
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
      columns: TableColumnType<RecordType>[];
    },
  ) => Promise<ExportToExcelActionConfig<RecordType, ValueType>[]>;
  columns?: TableColumnType<RecordType>[];
  dataSource?: RecordType[];
  onExport?: ExportToExcelActionExport<RecordType, ValueType>;
};

export type { ExportToExcelActionExport, ExportToExcelActionProps, ExportToExcelActionConfig };
