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
          },
        ]}
        onClick={() => {
          console.log('此时不支持下载');
          return false;
        }}
      >
        下载
      </ProDownloadExcelButton>
    </>
  );
};
