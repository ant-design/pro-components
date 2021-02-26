import ProDownloadExcelButton from '@ant-design/pro-download-excel-button';
import React from 'react';

export default () => {
  return (
    <>
      <ProDownloadExcelButton
        fileName="下载文件名称"
        configs={[
          {
            sheetName: 'sheet 1',
            columns: [
              {
                title: 'name',
                dataIndex: 'name',
              },
              {
                title: 'age',
                dataIndex: 'age',
              },
            ],
            dataSource: [
              {
                name: '刘德华',
                age: 18,
              },
              {
                name: '刘德华',
                age: 1001,
              },
            ],
            getSheetDataSourceItemMeta(val, col, rowIndex) {
              if (val == null) {
                return null;
              }
              if (['age'].includes(col.dataIndex as string) && rowIndex > 0) {
                return {
                  t: 'n',
                  z: Math.abs(val) >= 1000 ? '0,0.0000' : '0.0000',
                };
              }
              return null;
            },
          },
        ]}
      >
        下载
      </ProDownloadExcelButton>
    </>
  );
};
