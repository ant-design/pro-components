import { DownloadOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import type { MenuItemProps } from 'antd';
import { Dropdown, Menu } from 'antd';
import React, { memo, useCallback, useMemo } from 'react';
import { defaultTrigger } from './constants';
import type { ExportToExcelActionConfig, ExportToExcelActionProps } from './typings';
import { exportToExcel } from './utils/export-to-excel';
import type { MenuInfo } from 'rc-menu/es/interface';

function ExportToExcelAction<RecordType = unknown, ValueType = 'text'>(
  props: ExportToExcelActionProps<RecordType, ValueType>,
) {
  const { configs, fileName, onExport, columns, proColumns, dataSource } = props;
  const intl = useIntl();

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

  const getConfigs = useCallback(
    async (defaultConfigs: ExportToExcelActionConfig<RecordType, ValueType>[]) => {
      if (typeof configs === 'function') {
        const asyncConfigs = await configs(fileName, columns, proColumns, dataSource);
        return asyncConfigs;
      }
      return configs ?? defaultConfigs;
    },
    [configs, fileName, columns, proColumns, dataSource],
  );

  const exports = useCallback(
    async (info: MenuInfo, isAll?: boolean) => {
      const asyncConfigs = await getConfigs([
        {
          sheetName: defaultSheetName,
          columns: isAll ? proColumns : columns,
          dataSource: dataSource ?? [],
        },
      ]);

      exportToExcel<RecordType, ValueType>(
        info,
        fileName ?? defaultFileName,
        asyncConfigs,
        onExport,
      );
    },
    [
      proColumns,
      getConfigs,
      columns,
      defaultFileName,
      defaultSheetName,
      fileName,
      dataSource,
      onExport,
    ],
  );

  const handleExportAllFields: MenuItemProps['onClick'] = useCallback(
    async (info: MenuInfo) => {
      exports(info, true);
    },
    [exports],
  );

  const handleExportShowingFields: MenuItemProps['onClick'] = useCallback(
    (info: MenuInfo) => {
      exports(info);
    },
    [exports],
  );

  const menu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item key="export-all" onClick={handleExportAllFields}>
          {exportAllMenuTitle}
        </Menu.Item>
        <Menu.Item key="export-visible" onClick={handleExportShowingFields}>
          {exportVisibleMenuTitle}
        </Menu.Item>
      </Menu>
    );
  }, [
    handleExportAllFields,
    handleExportShowingFields,
    exportAllMenuTitle,
    exportVisibleMenuTitle,
  ]);

  return (
    <Dropdown trigger={defaultTrigger} overlay={menu}>
      <DownloadOutlined />
    </Dropdown>
  );
}

export default memo(ExportToExcelAction) as typeof ExportToExcelAction;
export type { ExportToExcelActionProps };
