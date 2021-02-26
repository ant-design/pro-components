import { ColumnType } from 'antd/lib/table';
import utl from 'lodash';
import React, { memo } from 'react';
import XLSX, { CellObject } from 'xlsx';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

type ColType = ColumnType<any>;

/** 处理 excel 列位置信息 */
const getLetter = (index: number) => {
  const LETTERS = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  const arrs = [];
  let next = index;
  do {
    const s = Math.floor(next / 26);
    const y = next % 26;
    arrs.unshift(y);
    next = s;
  } while (next !== 0);
  return arrs
    .map((item, iindex) => LETTERS[item - (arrs.length > 1 && iindex === 0 ? 1 : 0)])
    .join('');
};

type DownloadExcelButtonProps<RecordType = any> = {
  fileName: string;
  configs: {
    getSheetDataSourceItemMeta?: (
      cellVal: any,
      col: ColType,
      rowIndex: number,
    ) => CellObject | null;
    sheetName: string;
    columns: ColumnType<any>[];
    dataSource: RecordType[];
  }[];
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => boolean;
} & ButtonProps;

const DownloadExcelButton = memo<DownloadExcelButtonProps>((props) => {
  const { configs, fileName, onClick, ...restProps } = props;

  const handleBtnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onClick) {
      const continueProcess = onClick(event);
      if (continueProcess === false) return;
    }

    const wb = XLSX.utils.book_new();

    configs.forEach((meta) => {
      const { sheetName, dataSource, getSheetDataSourceItemMeta, columns } = meta;

      const rowDatas = [
        columns.map((col: ColType) => col.title),
        ...dataSource.map((record) => {
          return columns.map((col: ColType) => {
            const { dataIndex } = col;
            if (dataIndex == null) {
              throw new Error(`${dataIndex} must be exist`);
            }
            const getIndex = () => {
              if (Array.isArray(dataIndex)) {
                return dataIndex.join('.');
              }
              return dataIndex as string | number;
            };
            const val = record[getIndex()];
            return val;
          });
        }),
      ];

      const sheetDataSourceMeta = utl.flatten(
        rowDatas.map((rowData, rowIndex) => {
          return rowData.map((cellVal: any, index: number) => ({
            pos: `${getLetter(index)}${rowIndex + 1}`,
            value: cellVal,
            meta: getSheetDataSourceItemMeta?.(cellVal, columns[index], rowIndex),
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
  };

  return <Button {...restProps} onClick={handleBtnClick} />;
});

export default DownloadExcelButton;
export type { DownloadExcelButtonProps };
