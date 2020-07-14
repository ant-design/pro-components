import React from 'react';
import { Space } from 'antd';

/**
 * 默认的查询表单配置
 */
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};

export interface ActionsProps {
  submiter: React.ReactNode;
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  showCollapseButton: boolean;
  isForm?: boolean;
  span?: number | typeof defaultColConfig;
  /**
   * 收起按钮的 render
   */
  collapseRender?: (
    collapsed: boolean,
    /**
     * 是否应该展示，有两种情况
     * 列只有三列，不需要收起
     * form 模式 不需要收起
     */
    showCollapseButton?: boolean,
  ) => React.ReactNode;
  /**
   * 是否收起
   */
  collapsed?: boolean;
  /**
   * 收起按钮的事件
   */
  onCollapse?: (collapsed: boolean) => void;
}

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const Actions: React.FC<ActionsProps> = (props) => {
  const {
    setCollapse,
    collapse,
    showCollapseButton,
    isForm,
    collapseRender,
    submiter,
  } = props;

  return (
    <Space>
      {submiter}
      {!isForm && showCollapseButton && (
        <a
          onClick={() => {
            setCollapse(!collapse);
          }}
        >
          {collapseRender && collapseRender(collapse)}
        </a>
      )}
    </Space>
  );
};

export default Actions;
