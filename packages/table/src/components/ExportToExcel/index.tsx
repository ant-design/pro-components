import { PaperClipOutlined, LoadingOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { Tooltip } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import type { ExportToExcelActionConfig, ExportToExcelActionProps } from './typings';
import { exportToExcel } from './utils/export-to-excel';
import Container from '../../container';

function ExportToExcelAction<RecordType = unknown, ValueType = 'text'>(
  props: React.PropsWithChildren<ExportToExcelActionProps<RecordType, ValueType>>,
) {
  const { configs, fileName, onExport, dataSource, getSheetDataSourceItemMeta, children } = props;
  const counter = Container.useContainer();
  const { columns = [] } = counter;
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const defaultFileName = intl.getMessage('tableToolBar.export.defaultFileName', '默认导出文件名');
  const defaultSheetName = intl.getMessage('tableToolBar.export.defaultSheetName', 'sheet 1');

  const getConfigs = useCallback(
    async (isExportAll: boolean) => {
      const defaultConfigs: ExportToExcelActionConfig<RecordType, ValueType>[] = [
        {
          sheetName: defaultSheetName,
          columns,
          dataSource: dataSource ?? [],
          getSheetDataSourceItemMeta,
        },
      ];

      if (typeof configs === 'function') {
        setLoading(true);
        const asyncConfigs = await configs(columns, dataSource ?? [], {
          isExportAll,
          columns,
        });
        setLoading(false);
        return asyncConfigs.map((itemConfig) => {
          return {
            getSheetDataSourceItemMeta,
            sheetName: defaultSheetName,
            ...itemConfig,
          };
        });
      }
      return defaultConfigs;
    },
    [configs, columns, dataSource, defaultSheetName, getSheetDataSourceItemMeta],
  );

  const exports = useCallback(
    async (options: { isExportAll: boolean }) => {
      const finalConfigs = await getConfigs(options.isExportAll);
      exportToExcel<RecordType, ValueType>({
        fileName: fileName ?? defaultFileName,
        configs: finalConfigs,
        onExport,
        dataSource,
        columns,
      });
    },
    [defaultFileName, dataSource, columns, fileName, getConfigs, onExport],
  );

  const handleClick = useCallback(() => {
    if (loading === true) {
      return;
    }
    exports({ isExportAll: true });
  }, [exports, loading]);

  const dom = (
    <Tooltip title={intl.getMessage('tableToolBar.export.tooltip', '导出')}>
      {loading ? <LoadingOutlined /> : children || <PaperClipOutlined />}
    </Tooltip>
  );

  return <span onClick={handleClick}>{dom}</span>;
}

export type { ExportToExcelActionProps };

export default memo(ExportToExcelAction) as typeof ExportToExcelAction;
