import { ReloadOutlined } from '@ant-design/icons';
import type { TableColumnType } from 'antd';
import { Tooltip } from 'antd';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import type { IntlType } from '../../../provider';
import { useIntl } from '../../../provider';
import type { LabelTooltipType } from '../../../utils';
import { isDeepEqualReact, omitUndefined } from '../../../utils';
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
  /**
   * 工具栏搜索框配置，支持传入自定义 ReactNode 完全接管渲染，
   * 自定义节点时内置的 keyword 提交逻辑不再生效
   */
  search?:
    | (OptionSearchProps & { name?: string })
    | boolean
    | React.ReactNode;
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
  columns: (TableColumnType<T> & { index?: number })[];
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
  columns: (TableColumnType<T> & { index?: number })[],
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
  const defaultOptions = {
    reload: () => action?.current?.reload(),
    density: true,
    setting: true,
    search: false,
    fullScreen: () => action?.current?.fullScreen?.(),
  };

  let optionDom: React.ReactNode[];
  if (propsOptions === false) {
    optionDom = [];
  } else {
    const options = { ...defaultOptions, fullScreen: false, ...propsOptions };
    const settings = renderDefaultOption<T>(
      options,
      { ...defaultOptions, intl },
      action,
      columns,
    );
    optionDom = optionsRender
      ? optionsRender(
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
        )
      : settings;
  }
  // 操作列表
  const actions = toolBarRender
    ? toolBarRender(action?.current, { selectedRowKeys, selectedRows })
    : [];

  let searchConfig: any = false;
  if (propsOptions && propsOptions.search) {
    // 自定义节点直接透传给 ListToolBar 渲染，不注入受控 keyword 逻辑
    if (React.isValidElement(propsOptions.search)) {
      searchConfig = propsOptions.search;
    } else {
      /** 受控的value 和 onChange */
      const defaultSearchConfig = {
        value: counter.keyWords,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          counter.setKeyWords(e.target.value),
      };
      searchConfig =
        propsOptions.search === true
          ? defaultSearchConfig
          : {
              ...defaultSearchConfig,
              ...(propsOptions.search as OptionSearchProps & {
                name?: string;
              }),
            };
    }
  }

  useEffect(() => {
    if (counter.keyWords === undefined) {
      onSearch?.('');
    }
    // 只在 keyWords 变化时触发（onSearch 引用不稳定，不作为依赖）
  }, [counter.keyWords]);

  return (
    <ListToolBar
      title={headerTitle}
      tooltip={tooltip}
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
const ToolbarRender = <T,>(props: ToolbarRenderProps<T>) => {
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
    onFormSearchSubmit,
  } = props;

  const onSearch = useCallback(
    (keyword: string) => {
      if (!options || !options.search) {
        return;
      }
      const { name = 'keyword' } = (
        options.search === true || React.isValidElement(options.search)
          ? {}
          : options.search
      ) as { name?: string };

      /** 如果传入的 onSearch 返回值为 false，应该直接拦截请求 */
      const success = (options.search as OptionSearchProps)?.onSearch?.(
        keyword,
      );

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
    },
    [options, onFormSearchSubmit, actionRef],
  );

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
      onSearch={onSearch}
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

const isPropsEqual = <T,>(
  prev: ToolbarRenderProps<T>,
  next: ToolbarRenderProps<T>,
): boolean => {
  if (next.searchNode) {
    return false;
  }

  return isDeepEqualReact(
    {
      hideToolbar: prev.hideToolbar,
      tableColumn: prev.tableColumn,
      options: prev.options,
      tooltip: prev.tooltip,
      toolbar: prev.toolbar,
      selectedRows: prev.selectedRows,
      selectedRowKeys: prev.selectedRowKeys,
      headerTitle: prev.headerTitle,
      actionRef: prev.actionRef,
      toolBarRender: prev.toolBarRender,
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
    ['render', 'formItemRender'],
  );
};

export default memo(ToolbarRender, isPropsEqual) as typeof ToolbarRender;
