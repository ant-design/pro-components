import { ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import type { IntlType } from '@ant-design/pro-provider';
import { useIntl } from '@ant-design/pro-provider';
import { isDeepEqualReact, omitUndefined } from '@ant-design/pro-utils';
import type { TableColumnType } from 'antd';
import { Tooltip } from 'antd';
import type { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import React, { useEffect, useMemo } from 'react';
import Container from '../../container';
import type { ActionType, OptionSearchProps, ProTableProps } from '../../typing';
import ColumnSetting from '../ColumnSetting';
import type { ListToolBarProps } from '../ListToolBar';
import ListToolBar from '../ListToolBar';
import DensityIcon from './DensityIcon';
import FullScreenIcon from './FullscreenIcon';
import './index.less';

export type SettingOptionType = {
  draggable?: boolean;
  checkable?: boolean;
  checkedReset?: boolean;
  listsHeight?: number;
  extra?: React.ReactNode;
  children?: React.ReactNode;
};
export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean | SettingOptionType;
  search?: (OptionSearchProps & { name?: string }) | boolean;
};

export type OptionsFunctionType = (
  e: React.MouseEvent<HTMLSpanElement>,
  action?: ActionType,
) => void;

export type OptionsType = OptionsFunctionType | boolean;

export type ToolBarProps<T = unknown> = {
  headerTitle?: React.ReactNode;
  tooltip?: string | LabelTooltipType;
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
  action: React.MutableRefObject<ActionType | undefined>;
  options?: OptionConfig | false;
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  className?: string;
  onSearch?: (keyWords: string) => void;
  columns: TableColumnType<T>[];
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
  };
}

/**
 * 渲染默认的 工具栏
 *
 * @param options
 * @param className
 */
function renderDefaultOption<T>(
  options: OptionConfig,
  defaultOptions: OptionConfig & {
    intl: IntlType;
  },
  actions: React.MutableRefObject<ActionType | undefined>,
  columns: TableColumnType<T>[],
) {
  return Object.keys(options)
    .filter((item) => item)
    .map((key) => {
      const value = options[key];
      if (!value) {
        return null;
      }

      let onClick: OptionsFunctionType =
        value === true ? defaultOptions[key] : (event) => value?.(event, actions.current);

      if (typeof onClick !== 'function') {
        onClick = () => {};
      }

      if (key === 'setting') {
        return (
          <ColumnSetting {...(options[key] as SettingOptionType)} columns={columns} key={key} />
        );
      }
      if (key === 'fullScreen') {
        return (
          <span key={key} onClick={onClick}>
            <FullScreenIcon />
          </span>
        );
      }
      const optionItem = getButtonText(defaultOptions)[key];
      if (optionItem) {
        return (
          <span key={key} onClick={onClick}>
            <Tooltip title={optionItem.text}>{optionItem.icon}</Tooltip>
          </span>
        );
      }
      return null;
    })
    .filter((item) => item);
}

function ToolBar<T>({
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
  ...rest
}: ToolBarProps<T>) {
  const counter = Container.useContainer();

  const intl = useIntl();
  const optionDom = useMemo(() => {
    const defaultOptions = {
      reload: () => action?.current?.reload(),
      density: true,
      setting: true,
      search: false,
      fullScreen: () => action?.current?.fullScreen?.(),
    };
    if (propsOptions === false) {
      return [];
    }

    const options = {
      ...defaultOptions,
      fullScreen: false,
      ...propsOptions,
    };

    return renderDefaultOption<T>(
      options,
      {
        ...defaultOptions,
        intl,
      },
      action,
      columns,
    );
  }, [action, columns, intl, propsOptions]);
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

export type ToolbarRenderProps<T> = {
  hideToolbar: boolean;
  onFormSearchSubmit: (params: any) => void;
  searchNode: React.ReactNode;
  tableColumn: any[];
  tooltip?: string | LabelTooltipType;
  selectedRows: T[];
  selectedRowKeys: React.Key[];
  headerTitle: React.ReactNode;
  toolbar: ProTableProps<T, any, any>['toolbar'];
  options: ProTableProps<T, any, any>['options'];
  toolBarRender?: ToolBarProps<T>['toolBarRender'];
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

/** 这里负责与table交互，并且减少 render次数 */
class ToolbarRender<T> extends React.Component<ToolbarRenderProps<T>> {
  onSearch = (keyword: string) => {
    const { options, onFormSearchSubmit, actionRef } = this.props;

    if (!options || !options.search) {
      return;
    }
    const { name = 'keyword' } = options.search === true ? {} : options.search;

    /** 如果传入的 onSearch 返回值为 false，应该直接拦截请求 */
    const success = (options.search as OptionSearchProps)?.onSearch?.(keyword);

    if (success === false) return;

    // 查询的时候的回到第一页
    actionRef?.current?.setPageInfo?.({
      current: 1,
    });

    onFormSearchSubmit(
      omitUndefined({
        _timestamp: Date.now(),
        [name]: keyword,
      }),
    );
  };
  isEquals = (next: ToolbarRenderProps<T>) => {
    const {
      hideToolbar,
      tableColumn,
      options,
      tooltip,
      toolbar,
      selectedRows,
      selectedRowKeys,
      headerTitle,
      actionRef,
      toolBarRender,
    } = this.props;

    return isDeepEqualReact(
      {
        hideToolbar,
        tableColumn,
        options,
        tooltip,
        toolbar,
        selectedRows,
        selectedRowKeys,
        headerTitle,
        actionRef,
        toolBarRender,
      },
      {
        hideToolbar: next.hideToolbar,
        tableColumn: next.tableColumn,
        options: next.options,
        tooltip: next.tooltip,
        toolbar: next.toolbar,
        selectedRows: next.selectedRows,
        selectedRowKeys: next.selectedRowKeys,
        headerTitle: next.headerTitle,
        actionRef: next.actionRef,
        toolBarRender: next.toolBarRender,
      },
      ['render', 'renderFormItem'],
    );
  };
  shouldComponentUpdate = (next: ToolbarRenderProps<T>) => {
    if (next.searchNode) {
      return true;
    }
    return !this.isEquals(next);
  };

  render = () => {
    const {
      hideToolbar,
      tableColumn,
      options,
      searchNode,
      tooltip,
      toolbar,
      selectedRows,
      selectedRowKeys,
      headerTitle,
      actionRef,
      toolBarRender,
    } = this.props;

    // 不展示 toolbar
    if (hideToolbar) {
      return null;
    }
    return (
      <ToolBar<T>
        tooltip={tooltip}
        columns={tableColumn}
        options={options}
        headerTitle={headerTitle}
        action={actionRef}
        onSearch={this.onSearch}
        selectedRows={selectedRows}
        selectedRowKeys={selectedRowKeys}
        toolBarRender={toolBarRender}
        toolbar={{
          filter: searchNode,
          ...toolbar,
        }}
      />
    );
  };
}

export default ToolbarRender;
