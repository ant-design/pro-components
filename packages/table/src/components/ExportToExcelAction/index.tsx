import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import type { MenuItemProps } from 'antd';
import { Dropdown, Menu, Tooltip } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { defaultTrigger } from './constants';
import type { ExportToExcelActionConfig, ExportToExcelActionProps } from './typings';
import { exportToExcel } from './utils/export-to-excel';
import type { MenuInfo } from 'rc-menu/es/interface';
import { ColumnsType } from 'antd/lib/table';
import { ProColumns } from '../../typing';

function ExportToExcelAction<RecordType = unknown, ValueType = 'text'>(
  props: ExportToExcelActionProps<RecordType, ValueType>,
) {
  const {
    configs,
    fileName,
    onExport,
    columns,
    proColumns,
    dataSource,
    getSheetDataSourceItemMeta,
  } = props;
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const defaultFileName = intl.getMessage('tableToolBar.export.defaultFileName', '默认导出文件名');
  const defaultSheetName = intl.getMessage('tableToolBar.export.defaultSheetName', 'sheet 1');

  const exportAllMenuTitle = intl.getMessage(
    'tableToolBar.export.exportAllMenuTitle',
    '下载全部字段',
  );
  const exportVisibleMenuTitle = intl.getMessage(
    'tableToolBar.export.exportVisibleMenuTitle',
    '下载可见字段',
  );

  /** 获取在页面上展示的 columns，包括被 setting 隐藏的 column */
  const getShowingColumns = useCallback(() => {
    return proColumns.filter((col: ProColumns<RecordType, ValueType>) => col.hideInTable !== true);
  }, [proColumns]);

  const getConfigs = useCallback(
    async (isExportAll: boolean) => {
      const exportColumns = isExportAll ? getShowingColumns() : columns;

      const defaultConfigs: ExportToExcelActionConfig<RecordType, ValueType>[] = [
        {
          sheetName: defaultSheetName,
          columns: exportColumns,
          dataSource: dataSource ?? [],
          getSheetDataSourceItemMeta,
        },
      ];

      if (typeof configs === 'function') {
        setLoading(true);
        const asyncConfigs = await configs(exportColumns, dataSource ?? [], {
          isExportAll,
          allColumns: proColumns,
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
    [
      configs,
      columns,
      proColumns,
      dataSource,
      defaultSheetName,
      getSheetDataSourceItemMeta,
      getShowingColumns,
    ],
  );

  const exports = useCallback(
    async (options: { info?: MenuInfo; isExportAll: boolean }) => {
      const finalConfigs = await getConfigs(options.isExportAll);

      exportToExcel<RecordType, ValueType>({
        info: options.info,
        fileName: fileName ?? defaultFileName,
        configs: finalConfigs,
        onExport,
        dataSource,
        allColumns: proColumns,
        columns,
      });
    },
    [defaultFileName, dataSource, proColumns, columns, fileName, getConfigs, onExport],
  );

  const handleExportAllFields: MenuItemProps['onClick'] = useCallback(
    async (info: MenuInfo) => {
      exports({ info, isExportAll: true });
    },
    [exports],
  );

  const handleExportShowingFields: MenuItemProps['onClick'] = useCallback(
    (info: MenuInfo) => {
      exports({ info, isExportAll: false });
    },
    [exports],
  );

  const handleClick = useCallback(() => {
    if (loading === true) {
      return;
    }
    exports({ isExportAll: true });
  }, [exports, loading]);

  const menu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item disabled={loading} key="export-all" onClick={handleExportAllFields}>
          {exportAllMenuTitle}
        </Menu.Item>
        <Menu.Item disabled={loading} key="export-visible" onClick={handleExportShowingFields}>
          {exportVisibleMenuTitle}
        </Menu.Item>
      </Menu>
    );
  }, [
    handleExportAllFields,
    handleExportShowingFields,
    exportAllMenuTitle,
    exportVisibleMenuTitle,
    loading,
  ]);

  const dom = (
    <Tooltip title={intl.getMessage('tableToolBar.export.tooltip', '导出')}>
      {loading ? <LoadingOutlined /> : <DownloadOutlined />}
    </Tooltip>
  );

  if (getShowingColumns().length !== columns.length) {
    return (
      <Dropdown trigger={defaultTrigger} overlay={menu}>
        {dom}
      </Dropdown>
    );
  }

  return <span onClick={handleClick}>{dom}</span>;
}

export default memo(ExportToExcelAction) as typeof ExportToExcelAction;
export type { ExportToExcelActionProps };
