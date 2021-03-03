import { DownloadOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import type { IntlType } from '@ant-design/pro-provider';
import { useIntl } from '@ant-design/pro-provider';
import type { TableColumnType } from 'antd';
import { Tooltip } from 'antd';
import type { SearchProps } from 'antd/lib/input';
import React, { useEffect, useMemo } from 'react';
import Container from '../../container';
import type { ActionType, ProColumns } from '../../typing';
import ColumnSetting from '../ColumnSetting';
import type { ExportToExcelActionProps } from '../ExportToExcelAction';
import ExportToExcelAction from '../ExportToExcelAction';
import type { ExportToExcelActionExport } from '../ExportToExcelAction/typings';
import type { ListToolBarProps } from '../ListToolBar';
import ListToolBar from '../ListToolBar';
import DensityIcon from './DensityIcon';
import FullScreenIcon from './FullscreenIcon';
import './index.less';

export type OptionConfig<T = unknown, ValueType = 'text'> = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?:
    | boolean
    | {
        draggable?: boolean;
        checkable?: boolean;
      };
  search?: (SearchProps & { name?: string }) | boolean;
  export?:
    | boolean
    | ((
        ...args: [...Parameters<ExportToExcelActionExport<T, ValueType>>, ActionType?]
      ) => ReturnType<ExportToExcelActionExport<T, ValueType>>)
    | Omit<ExportToExcelActionProps, 'dataSource' | 'columns' | 'proColumns'>;
};

export type OptionsType =
  | ((e: React.MouseEvent<HTMLSpanElement>, action?: ActionType) => void)
  | boolean;

export type ToolBarProps<T = unknown, ValueType = 'text'> = {
  headerTitle?: React.ReactNode;
  tooltip?: string;
  /** @deprecated 你可以使用 tooltip，这个更改是为了与 antd 统一 */
  tip?: string;
  toolbar?: ListToolBarProps;
  toolBarRender?: (
    action: ActionType | undefined,
    rows: {
      selectedRowKeys?: (string | number)[];
      selectedRows?: T[];
    },
  ) => React.ReactNode[];
  action?: React.MutableRefObject<ActionType | undefined>;
  options?: OptionConfig<T, ValueType> | false;
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  className?: string;
  onSearch?: (keyWords: string) => void;
  columns: TableColumnType<T>[];
  proColumns: ProColumns<T, ValueType>[];
  tableColumns: TableColumnType<T>[];
  dataSource?: readonly T[];
};

function getButtonText({
  intl,
}: OptionConfig & {
  intl: IntlType;
}) {
  return {
    reload: {
      text: intl.getMessage('tableToolBar.reload', '刷新'),
      icon: <ReloadOutlined />,
    },
    density: {
      text: intl.getMessage('tableToolBar.density', '表格密度'),
      icon: <DensityIcon />,
    },
    setting: {
      text: intl.getMessage('tableToolBar.columnSetting', '列设置'),
      icon: <SettingOutlined />,
    },
    fullScreen: {
      text: intl.getMessage('tableToolBar.fullScreen', '全屏'),
      icon: <FullScreenIcon />,
    },
    export: {
      text: intl.getMessage('tableToolBar.export.tooltip', '导出'),
      icon: <DownloadOutlined />,
    },
  };
}

/**
 * 渲染默认的 工具栏
 *
 * @param options
 * @param className
 */
function renderDefaultOption<T = unknown, ValueType = 'text'>(
  options: OptionConfig<T, ValueType>,
  defaultOptions: OptionConfig<T, ValueType> & {
    intl: IntlType;
  },
  columns: TableColumnType<T>[],
  tableColumns: TableColumnType<T>[],
  proColumns: ProColumns<T, ValueType>[],
  dataSource?: readonly T[],
  action?: React.MutableRefObject<ActionType | undefined>,
) {
  return Object.keys(options)
    .filter((item) => item)
    .map((key) => {
      const value = options[key];
      if (!value) {
        return null;
      }
      if (key === 'setting') {
        return <ColumnSetting {...options[key]} columns={tableColumns} key={key} />;
      }
      if (key === 'fullScreen') {
        return (
          <span key={key} onClick={value === true ? defaultOptions[key] : value}>
            <FullScreenIcon />
          </span>
        );
      }
      if (key === 'export') {
        const getMeta = () => {
          if (typeof value === 'function') {
            return { onExport: (...args) => value(...args, action) } as ExportToExcelActionProps;
          }
          if (typeof value === 'object') {
            return {
              ...value,
              onExport: (...args) => value.onExport?.(...args, action),
            } as ExportToExcelActionProps;
          }
          return value;
        };

        return (
          <ExportToExcelAction<T, ValueType>
            key={key}
            {...getMeta()}
            columns={columns}
            proColumns={proColumns}
            dataSource={dataSource}
          />
        );
      }
      const optionItem = getButtonText(defaultOptions)[key];
      if (optionItem) {
        return (
          <span
            key={key}
            onClick={() => {
              if (value && defaultOptions[key] !== true) {
                if (value !== true) {
                  value();
                  return;
                }
                defaultOptions[key]();
              }
            }}
          >
            <Tooltip title={optionItem.text}>{optionItem.icon}</Tooltip>
          </span>
        );
      }
      return null;
    })
    .filter((item) => item);
}

function ToolBar<T, ValueType>({
  headerTitle,
  tooltip,
  toolBarRender,
  action,
  options: propsOptions,
  selectedRowKeys,
  selectedRows,
  toolbar,
  onSearch,
  columns,
  dataSource,
  proColumns,
  tableColumns,
  ...rest
}: ToolBarProps<T, ValueType>) {
  const counter = Container.useContainer();

  const intl = useIntl();
  const optionDom = useMemo(() => {
    const defaultOptions = {
      reload: () => action?.current?.reload(),
      density: true,
      setting: true,
      search: false,
      export: false,
      fullScreen: () => action?.current?.fullScreen?.(),
    };
    if (propsOptions === false) {
      return [];
    }

    const options = {
      ...defaultOptions,
      ...(propsOptions || {
        fullScreen: false,
      }),
    };

    return renderDefaultOption<T, ValueType>(
      options,
      {
        ...defaultOptions,
        intl,
      },
      columns,
      tableColumns,
      proColumns,
      dataSource,
      action,
    );
  }, [action, columns, proColumns, intl, propsOptions, tableColumns, dataSource]);
  // 操作列表
  const actions = toolBarRender
    ? toolBarRender(action?.current, { selectedRowKeys, selectedRows })
    : [];

  const searchConfig = useMemo(() => {
    if (!propsOptions) {
      return false;
    }
    if (!propsOptions.search) return false;

    /** 受控的value 和 onChange */
    const defaultSearchConfig = {
      value: counter.keyWords,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => counter.setKeyWords(e.target.value),
    };

    if (propsOptions.search === true) return defaultSearchConfig;

    return {
      ...defaultSearchConfig,
      ...propsOptions.search,
    };
  }, [counter, propsOptions]);

  useEffect(() => {
    if (counter.keyWords === undefined) {
      onSearch?.('');
    }
  }, [counter.keyWords, onSearch]);
  return (
    <ListToolBar
      title={headerTitle}
      tooltip={tooltip || rest.tip}
      search={searchConfig}
      onSearch={onSearch}
      actions={actions}
      settings={optionDom}
      {...toolbar}
    />
  );
}

export default ToolBar;
