import { ReloadOutlined } from '@ant-design/icons';
import type { IntlType } from '@ant-design/pro-provider';
import { useIntl } from '@ant-design/pro-provider';
import { isDeepEqualReact, omitUndefined } from '@ant-design/pro-utils';
import type { TableColumnType } from 'antd';
import { Tooltip } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import React, { useContext, useEffect, useMemo } from 'react';
import { TableContext } from '../../Store/Provide';
import type {
  ActionType,
  OptionSearchProps,
  ProTableProps,
} from '../../typing';
import ColumnSetting from '../ColumnSetting';
import type { ListToolBarProps } from '../ListToolBar';
import ListToolBar from '../ListToolBar';
import DensityIcon from './DensityIcon';
import FullScreenIcon from './FullscreenIcon';

export type SettingOptionType = {
  draggable?: boolean;
  checkable?: boolean;
  showListItemOption?: boolean;
  checkedReset?: boolean;
  listsHeight?: number;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  settingIcon?: React.ReactNode;
};
export type OptionConfig = {
  density?: boolean;
  fullScreen?: OptionsType;
  reload?: OptionsType;
  setting?: boolean | SettingOptionType;
  search?: (OptionSearchProps & { name?: string }) | boolean;
  reloadIcon?: React.ReactNode;
  densityIcon?: React.ReactNode;
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
  optionsRender?: ToolbarRenderProps<T>['optionsRender'];
  selectedRowKeys?: (string | number)[];
  selectedRows?: T[];
  className?: string;
  onSearch?: (keyWords: string) => void;
  columns: TableColumnType<T>[];
};

function getButtonText(
  {
    intl,
  }: OptionConfig & {
    intl: IntlType;
  },
  options: OptionConfig,
) {
  return {
    reload: {
      text: intl.getMessage('tableToolBar.reload', '刷新'),
      icon: options.reloadIcon ?? <ReloadOutlined />,
    },
    density: {
      text: intl.getMessage('tableToolBar.density', '表格密度'),
      icon: <DensityIcon icon={options.densityIcon} />,
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
      const value = options[key as 'fullScreen'];
      if (!value) {
        return null;
      }

      let onClick =
        value === true
          ? defaultOptions[key as keyof OptionConfig]
          : (event: any) => {
              value?.(event, actions.current);
            };

      if (typeof onClick !== 'function') {
        onClick = () => {};
      }

      if (key === 'setting') {
        return (
          <ColumnSetting
            {...(options[key] as SettingOptionType)}
            columns={columns}
            key={key}
          />
        );
      }
      if (key === 'fullScreen') {
        return (
          <span key={key} onClick={onClick}>
            <FullScreenIcon />
          </span>
        );
      }
      const optionItem = getButtonText(defaultOptions, options)[
        key as 'fullScreen'
      ];
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
  optionsRender,
  ...rest
}: ToolBarProps<T>) {
  const counter = useContext(TableContext);

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

    const settings = renderDefaultOption<T>(
      options,
      {
        ...defaultOptions,
        intl,
      },
      action,
      columns,
    );
    if (optionsRender) {
      return optionsRender(
        {
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
          optionsRender,
          ...rest,
        },
        settings,
      );
    }
    return settings;
  }, [
    action,
    columns,
    headerTitle,
    intl,
    onSearch,
    optionsRender,
    propsOptions,
    rest,
    selectedRowKeys,
    selectedRows,
    toolBarRender,
    toolbar,
    tooltip,
  ]);
  // 操作列表
  const actions = toolBarRender
    ? toolBarRender(action?.current, { selectedRowKeys, selectedRows })
    : [];

  const searchConfig: any = useMemo(() => {
    if (!propsOptions) {
      return false;
    }
    if (!propsOptions.search) return false;

    /** 受控的value 和 onChange */
    const defaultSearchConfig = {
      value: counter.keyWords,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        counter.setKeyWords(e.target.value),
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
  selectedRowKeys: React.Key[] | (string | number)[];
  headerTitle: React.ReactNode;
  toolbar: ProTableProps<T, any, any>['toolbar'];
  options: ProTableProps<T, any, any>['options'];
  optionsRender?: (
    props: ToolBarProps<T>,
    defaultDom: React.ReactNode[],
  ) => React.ReactNode[];
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
      optionsRender,
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
        selectedRowKeys={selectedRowKeys as (string | number)[]}
        toolBarRender={toolBarRender}
        toolbar={{
          filter: searchNode,
          ...toolbar,
        }}
        optionsRender={optionsRender}
      />
    );
  };
}

export default ToolbarRender;
