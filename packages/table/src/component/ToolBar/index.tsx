import React, { useContext } from 'react';
import { ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Divider, Space, Tooltip, Input } from 'antd';
import { ConfigContext } from 'antd/lib/config-provider/context';
import { SearchProps } from 'antd/lib/input';
import { useIntl, IntlType } from '@ant-design/pro-provider';
import { LabelIconTip } from '@ant-design/pro-utils';
import ColumnSetting from '../ColumnSetting';
import { UseFetchDataAction, RequestData } from '../../useFetchData';
import './index.less';
import FullScreenIcon from './FullscreenIcon';
import DensityIcon from './DensityIcon';

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
  tip?: string;
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
}

const getButtonText = <T, U = {}>({
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
const renderDefaultOption = <T, U = {}>(
  options: ToolBarProps<T>['options'],
  className: string,
  defaultOptions: OptionConfig<T> & {
    intl: IntlType;
  },
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
        return <ColumnSetting key={key} />;
      }
      if (key === 'fullScreen') {
        return (
          <span
            key={key}
            className={className}
            onClick={value === true ? defaultOptions[key] : value}
          >
            <FullScreenIcon />
          </span>
        );
      }
      const optionItem = getButtonText<T>(defaultOptions)[key];
      if (optionItem) {
        return (
          <span
            key={key}
            className={className}
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

const ToolBar = <T, U = {}>({
  headerTitle,
  tip,
  toolBarRender,
  action,
  options: propsOptions,
  selectedRowKeys,
  selectedRows,
  onSearch,
}: ToolBarProps<T>) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const className = getPrefixCls('pro-table-toolbar');

  const defaultOptions = {
    reload: () => action.reload(),
    density: true,
    setting: true,
    search: false,
    fullScreen: () => action.fullScreen && action.fullScreen(),
  };

  const options =
    propsOptions !== false
      ? {
          ...defaultOptions,
          ...(propsOptions || {}),
        }
      : false;

  const intl = useIntl();
  const optionDom =
    renderDefaultOption<T>(options, `${className}-item-icon`, {
      ...defaultOptions,
      intl,
    }) || [];
  // 操作列表
  const actions = toolBarRender ? toolBarRender(action, { selectedRowKeys, selectedRows }) : [];
  const renderDivider = () => {
    if (optionDom.length < 1) {
      return false;
    }
    if (actions.length < 1 && options && options.search === false) {
      return false;
    }
    return <Divider type="vertical" />;
  };
  return (
    <div className={className}>
      <div className={`${className}-title`}>
        <LabelIconTip label={headerTitle} tip={tip} />
      </div>
      <div className={`${className}-option`}>
        <Space>
          {options && options.search && (
            <Input.Search
              placeholder={intl.getMessage('tableForm.inputPlaceholder', '请输入')}
              style={{
                width: 200,
              }}
              {...options.search}
              onSearch={onSearch}
            />
          )}
          {actions
            .filter((item) => item)
            .map((node, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                {node}
              </div>
            ))}
        </Space>
        <div className={`${className}-default-option`}>
          {renderDivider()}
          <Space>{optionDom}</Space>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
