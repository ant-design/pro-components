import type { LabelIconTipProps } from '@ant-design/pro-utils';
import utl from 'lodash';
import get from 'lodash.get';
import type { MenuInfo } from 'rc-menu/es/interface';
import React from 'react';
import XLSX from 'xlsx';
import type { ExportToExcelActionConfig, ExportToExcelActionExport } from '../typings';
import { getLetter } from './get-letter';
import type { ProColumns } from '../../../typing';
import type { TableColumnType } from 'antd';

function exportToExcel<RecordType = unknown, ValueType = 'text'>(options: {
  info?: MenuInfo;
  dataSource?: RecordType[];
  allColumns: ProColumns<RecordType, ValueType>[];
  columns: TableColumnType<RecordType>[];
  fileName: string;
  configs: ExportToExcelActionConfig<RecordType, ValueType>[];
  onExport?: ExportToExcelActionExport<RecordType, ValueType>;
}) {
  const { info, fileName, configs, onExport, dataSource, allColumns, columns } = options;

  const result = onExport?.({ info, configs, xlsx: XLSX, dataSource, allColumns, columns });

  if (result === false) return;

  const wb = XLSX.utils.book_new();

  configs.forEach((meta) => {
    const {
      sheetName,
      dataSource: itemDataSource,
      columns: itemColumns,
      getSheetDataSourceItemMeta,
    } = meta;

    const customColumns: {
      title?: React.ReactNode;
      hideInExcel?: boolean;
      excelColTitle?: string;
      dataIndex?: readonly React.ReactText[] | React.ReactText;
    }[] = itemColumns;

    const targetColumns = customColumns.filter((item) => {
      return item.hideInExcel !== true;
    });

    /** 暂时不支持 table-group-column 形式 */
    const rowDatas = [
      targetColumns.map((col) => {
        if (col.excelColTitle != null) {
          return col.excelColTitle;
        }
        if (typeof col.title === 'string') {
          return col.title;
        }
        if (React.isValidElement(col.title)) {
          return (col.title as React.ReactElement<LabelIconTipProps>).props.label;
        }
        return null;
      }),
      ...itemDataSource.map((record) => {
        return targetColumns.map((col) => {
          const { dataIndex } = col;
          if (dataIndex == null) {
            return null;
          }
          const val = get(record, dataIndex);
          return val;
        });
      }),
    ];

    const sheetDataSourceMeta = utl.flatten(
      rowDatas.map((rowData, rowIndex) => {
        return rowData.map((cellVal, index) => ({
          pos: `${getLetter(index)}${rowIndex + 1}`,
          value: cellVal,
          meta: getSheetDataSourceItemMeta?.(cellVal, customColumns[index], rowIndex),
        }));
      }),
    );

    const ws = XLSX.utils.aoa_to_sheet(rowDatas);

    sheetDataSourceMeta
      .filter((item) => item.meta != null)
      .forEach((item) => {
        ws[item.pos] = {
          v: item.value,
          ...item.meta,
        };
      });

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

export { exportToExcel };
