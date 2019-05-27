import React from 'react';
import { RouteContext, GridContent } from '../';
import { PageHeader, Tabs, Typography } from 'antd';
import styles from './index.less';
import { TabsProps } from 'antd/lib/tabs';

interface IPageHeaderTabConfig {
  tabList?: Array<{
    key: string;
    tab: string;
  }>;
  tabActiveKey?: TabsProps['activeKey'];
  onTabChange?: TabsProps['onChange'];
  tabBarExtraContent?: TabsProps['tabBarExtraContent'];
}

interface IPageHeaderWrapperProps extends IPageHeaderTabConfig {
  content?: React.ReactNode;
  title?: React.ReactNode;
  extraContent?: React.ReactNode;
}

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter = ({
  tabList,
  tabActiveKey,
  onTabChange,
  tabBarExtraContent,
}: IPageHeaderTabConfig) => {
  return tabList && tabList.length ? (
    <Tabs
      className={styles.tabs}
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

const PageHeaderWrapper: React.SFC<IPageHeaderWrapperProps> = ({
  children,
  title,
  content,
  extraContent,
  ...restProps
}) => (
  <RouteContext.Consumer>
    {value => (
      <div style={{ margin: '-24px -24px 0' }}>
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
          <div className={styles.detail}>
            <div className={styles.main}>
              <div className={styles.row}>
                {content && <div className={styles.content}>{content}</div>}
                {extraContent && (
                  <div className={styles.extraContent}>{extraContent}</div>
                )}
              </div>
            </div>
          </div>
        </PageHeader>
        {children ? (
          <GridContent>
            <div className={styles['children-content']}>{children}</div>
          </GridContent>
        ) : null}
      </div>
    )}
  </RouteContext.Consumer>
);

export default PageHeaderWrapper;
