import { ArrowDownOutlined, MenuOutlined } from '@ant-design/icons';
import { Anchor, Collapse, ConfigProvider } from 'antd';
import { useResponsive } from 'antd-style';
import { useRouteMeta } from 'dumi';
import { useMemo, useState, type FC } from 'react';

import { useStyles } from './style';

type AnchorItem = {
  id: string;
  title: string;
  children?: AnchorItem[];
};

const Toc: FC = () => {
  const [activeLink, setActiveLink] = useState<string>();
  const meta = useRouteMeta();
  const { styles } = useStyles();
  const { mobile } = useResponsive();
  const anchorItems = useMemo(
    () =>
      meta.toc.reduce<AnchorItem[]>((result, item) => {
        if (item.depth === 2) {
          result.push({ ...item });
        } else if (item.depth === 3) {
          const parent = result[result.length - 1];
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push({ ...item });
          }
        }
        return result;
      }, []),
    [meta.toc],
  );

  const activeAnchor = meta.toc.find((item) => item.id === activeLink);

  return (
    (anchorItems?.length === 0 ? null : mobile ? (
      <ConfigProvider theme={{ token: { fontSize: 12, sizeStep: 3 } }}>
        <div className={styles.mobileCtn}>
          <Collapse
            bordered={false}
            ghost
            expandIconPosition={'end'}
            expandIcon={({ isActive }) => (isActive ? <ArrowDownOutlined /> : <MenuOutlined />)}
            className={styles.expand}
          >
            <Collapse.Panel
              forceRender
              key={'toc'}
              header={!activeAnchor ? '目录' : activeAnchor.title}
            >
              <ConfigProvider theme={{ token: { fontSize: 14, sizeStep: 4 } }}>
                <Anchor
                  onChange={(currentLink) => {
                    setActiveLink(currentLink.replace('#', ''));
                  }}
                  items={anchorItems.map((item) => ({
                    href: `#${item.id}`,
                    title: item.title,
                    key: item.id,
                    children: item.children?.map((child) => ({
                      href: `#${child.id}`,
                      title: child?.title,
                      key: child.id,
                    })),
                  }))}
                />
              </ConfigProvider>
            </Collapse.Panel>
          </Collapse>
        </div>
      </ConfigProvider>
    ) : (
      <div className={styles.container}>
        <h4>Table of Contents</h4>
        <Anchor
          items={anchorItems.map((item) => ({
            href: `#${item.id}`,
            title: item.title,
            key: item.id,
            children: item.children?.map((child) => ({
              href: `#${child.id}`,
              title: child?.title,
              key: child.id,
            })),
          }))}
        />
      </div>
    )) || null
  );
};

export default Toc;
