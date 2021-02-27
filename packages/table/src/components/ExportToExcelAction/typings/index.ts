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
  sheetName: string;
  columns: TableColumnType<T>[] | ProColumns<T, V>[];
  dataSource: T[];
};

type ExportToExcelActionExport<T = unknown, V = 'text'> = (
  info: MenuInfo,
  fileName: string,
  configs: ExportToExcelActionConfig<T, V>[],
  xlsx: typeof XLSX,
) => boolean | void;

type ExportToExcelActionProps<RecordType = unknown, ValueType = 'text'> = {
  fileName: string;
  configs?:
    | ExportToExcelActionConfig<RecordType, ValueType>[]
    | (() => Promise<ExportToExcelActionConfig<RecordType, ValueType>[]>);
  originColumns: ProColumns<RecordType, ValueType>[];
  columns: TableColumnType<RecordType>[];
  dataSource?: RecordType[];
  onExport?: ExportToExcelActionExport<RecordType, ValueType>;
};

export type { ExportToExcelActionExport, ExportToExcelActionProps, ExportToExcelActionConfig };
