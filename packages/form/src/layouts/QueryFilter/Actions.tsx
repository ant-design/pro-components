import React from 'react';
import { Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export interface ActionsProps {
  submitter: React.ReactNode;
  /**
   * 是否收起
   */
  collapsed?: boolean;
  /**
   * 收起按钮的事件
   */
  onCollapse?: (collapsed: boolean) => void;

  setCollapsed: (collapse: boolean) => void;
  isForm?: boolean;
  style?: React.CSSProperties;
  /**
   * 收起按钮的 render
   */
  collapseRender?:
    | ((
        collapsed: boolean,
        /**
         * 是否应该展示，有两种情况
         * 列只有三列，不需要收起
         * form 模式 不需要收起
         */
        props: ActionsProps,
      ) => React.ReactNode)
    | false;
}

const defaultCollapseRender: ActionsProps['collapseRender'] = (collapsed) => {
  if (collapsed) {
    return (
      <>
        展开
        <DownOutlined
          style={{
            marginLeft: '0.5em',
            transition: '0.3s all',
            transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
          }}
        />
      </>
    );
  }
  return (
    <>
      收起
      <DownOutlined
        style={{
          marginLeft: '0.5em',
          transition: '0.3s all',
          transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
        }}
      />
    </>
  );
};

/**
 * FormFooter 的组件，可以自动进行一些配置
 * @param props
 */
const Actions: React.FC<ActionsProps> = (props) => {
  const {
    setCollapsed,
    collapsed = false,
    collapseRender = defaultCollapseRender,
    submitter,
    style,
  } = props;
  return (
    <Space style={style}>
      {submitter}
      {collapseRender !== false && (
        <a
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapseRender(collapsed, props)}
        </a>
      )}
    </Space>
  );
};

export default Actions;
