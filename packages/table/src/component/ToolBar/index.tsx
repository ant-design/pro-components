import React, { useEffect } from 'react';
import { ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { SearchProps } from 'antd/lib/input';
import { ColumnType } from 'antd/lib/table';
import { useIntl, IntlType } from '@ant-design/pro-provider';
import ListToolBar, { ListToolBarProps } from '../ListToolBar';
import ColumnSetting from '../ColumnSetting';
import { UseFetchDataAction, RequestData } from '../../useFetchData';
import './index.less';
import FullScreenIcon from './FullscreenIcon';
import DensityIcon from './DensityIcon';
import Container from '../../container';

export interface OptionConfig<T> {
  density?: boolean;
  fullScreen?: OptionsType<T>;
  reload?: OptionsType<T>;
  setting?: boolean;
  search?: (SearchProps & { name?: string }) | boolean;
}

export type OptionsType<T = unknown> =
  | ((e: React.MouseEvent<HTMLSpanElement>, action?: UseFetchDataAction<RequestData<T>>) => void)
  | boolean;

export interface ToolBarProps<T = unknown> {
  headerTitle?: React.ReactNode;
  tooltip?: string;
  /**
   * @deprecated 你可以使用 tooltip，这个更改是为了与 antd 统一
   */
  tip?: string;
  toolbar?: ListToolBarProps;
  toolBarRender?: (
    action: UseFetchDataAction<RequestData<T>>,
    rows: {
      selectedRowKeys?: (string | number)[];
      selectedRows?: T[];
    },
  ) => React.ReactNode[];
  action: UseFetchDataAction<RequestData<T>>;
  options?: OptionConfig<T> | false;
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  className?: string;
  onSearch?: (keyWords: string) => void;
  columns: ColumnType<T>[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getButtonText = <T, _U = {}>({
  intl,
}: OptionConfig<T> & {
  intl: IntlType;
}) => ({
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
});

/**
 * 渲染默认的 工具栏
 * @param options
 * @param className
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderDefaultOption = <T, _U = {}>(
  options: ToolBarProps<T>['options'],
  defaultOptions: OptionConfig<T> & {
    intl: IntlType;
  },
  columns: ColumnType<T>[],
) =>
  options &&
  Object.keys(options)
    .filter((item) => item)
    .map((key) => {
      const value = options[key];
      if (!value) {
        return null;
      }
      if (key === 'setting') {
        return <ColumnSetting columns={columns} key={key} />;
      }
      if (key === 'fullScreen') {
        return (
          <span key={key} onClick={value === true ? defaultOptions[key] : value}>
            <FullScreenIcon />
          </span>
        );
      }
      const optionItem = getButtonText<T>(defaultOptions)[key];
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ToolBar = <T, _U = {}>({
  headerTitle,
  tooltip,
  columns,
  toolBarRender,
  action,
  options: propsOptions,
  selectedRowKeys,
  selectedRows,
  toolbar,
  onSearch,
  ...rest
}: ToolBarProps<T>) => {
  const defaultOptions = {
    reload: () => action.reload(),
    density: true,
    setting: true,
    search: false,
    fullScreen: () => action.fullScreen && action.fullScreen(),
  };
  const counter = Container.useContainer();
  const options =
    propsOptions !== false
      ? {
          ...defaultOptions,
          ...(propsOptions || {
            fullScreen: false,
          }),
        }
      : false;

  const intl = useIntl();
  const optionDom =
    renderDefaultOption<T>(
      options,
      {
        ...defaultOptions,
        intl,
      },
      columns,
    ) || [];
  // 操作列表
  const actions = toolBarRender ? toolBarRender(action, { selectedRowKeys, selectedRows }) : [];
  const getSearchConfig = (search: OptionConfig<any>['search']) => {
    if (!search) return false;

    /**
     * 受控的value 和 onChange
     */
    const defaultSearchConfig = {
      value: counter.keyWords,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => counter.setKeyWords(e.target.value),
    };

    if (search === true) return defaultSearchConfig;

    return {
      ...defaultSearchConfig,
      ...search,
    };
  };

  useEffect(() => {
    if (counter.keyWords === undefined) {
      onSearch?.('');
    }
  }, [counter.keyWords]);
  return (
    <ListToolBar
      title={headerTitle}
      tip={tooltip || rest.tip}
      search={options && getSearchConfig(options.search)}
      onSearch={onSearch}
      actions={actions}
      settings={optionDom}
      {...toolbar}
    />
  );
};

export default ToolBar;
