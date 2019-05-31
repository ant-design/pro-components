import { PageHeader, Tabs, Typography } from 'antd';
import React from 'react';
import { TabsProps } from 'antd/lib/tabs';
import './index.less';
import GridContent from '../GridContent';
import RouteContext from '../RouteContext';

interface PageHeaderTabConfig {
  tabList?: {
    key: string;
    tab: string;
  }[];
  tabActiveKey?: TabsProps['activeKey'];
  onTabChange?: TabsProps['onChange'];
  tabBarExtraContent?: TabsProps['tabBarExtraContent'];
}

interface PageHeaderWrapperProps extends PageHeaderTabConfig {
  content?: React.ReactNode;
  title?: React.ReactNode;
  extraContent?: React.ReactNode;
}

const prefixedClassName = 'ant-pro-page-header-wrap';

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter: React.SFC<PageHeaderWrapperProps> = ({
  tabList,
  tabActiveKey,
  onTabChange,
  tabBarExtraContent,
}) => {
  return tabList && tabList.length ? (
    <Tabs
      className={`${prefixedClassName}-tabs`}
      activeKey={tabActiveKey}
      onChange={key => {
        if (onTabChange) {
          onTabChange(key);
        }
      }}
      tabBarExtraContent={tabBarExtraContent}
    >
      {tabList.map(item => (
        <Tabs.TabPane tab={item.tab} key={item.key} />
      ))}
    </Tabs>
  ) : null;
};

const renderPageHeader = (
  content: React.ReactNode,
  extraContent: React.ReactNode,
): React.ReactNode => {
  if (!content && !extraContent) {
    return null;
  }
  return (
    <div className={`${prefixedClassName}-detail`}>
      <div className={`${prefixedClassName}-main`}>
        <div className={`${prefixedClassName}-row`}>
          {content && (
            <div className={`${prefixedClassName}-content`}>{content}</div>
          )}
          {extraContent && (
            <div className={`${prefixedClassName}-extraContent`}>
              {extraContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PageHeaderWrapper: React.SFC<PageHeaderWrapperProps> = ({
  children,
  title,
  content,
  extraContent,
  ...restProps
}) => (
  <RouteContext.Consumer>
    {value => (
      <div style={{ margin: '-24px -24px 0' }}>
        <div className={`${prefixedClassName}-page-header-warp`}>
          <GridContent>
            <PageHeader
              {...value}
              title={
                <Typography.Title
                  level={4}
                  style={{
                    margin: 0,
                  }}
                >
                  {title || value.title}
                </Typography.Title>
              }
              {...restProps}
              footer={renderFooter(restProps)}
            >
              {renderPageHeader(content, extraContent)}
            </PageHeader>
          </GridContent>
        </div>
        {children ? (
          <GridContent>
            <div className={`${prefixedClassName}-children-content`}>
              {children}
            </div>
          </GridContent>
        ) : null}
      </div>
    )}
  </RouteContext.Consumer>
);

export default PageHeaderWrapper;
