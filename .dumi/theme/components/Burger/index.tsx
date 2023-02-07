import { Link } from '@@/exports';
import { Drawer, Menu } from 'antd';
import isEqual from 'fast-deep-equal';
import { uniq } from 'lodash';
import { useState } from 'react';
import { Center } from 'react-layout-kit';
import { activePathSel, useSiteStore } from '../../store/useSiteStore';
import { useStyles } from './style';

const Burger = () => {
  const [opened, setOpened] = useState(false);
  const { styles, cx } = useStyles();

  const nav = useSiteStore((s) => s.navData, isEqual);
  const sidebar = useSiteStore((s) => s.sidebar, isEqual);
  const activePath = useSiteStore(activePathSel);
  const pathname = useSiteStore((s) => s.location.pathname);

  return (
    <Center
      className={styles.container}
      onClick={() => {
        setOpened(!opened);
      }}
    >
      <div className={cx(styles.icon, opened ? styles.active : '')} />

      <Drawer
        open={opened}
        placement={'left'}
        closeIcon={null}
        rootClassName={styles.drawerRoot}
        className={styles.drawer}
        width={'100vw'}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: '24px 0' }}
      >
        <Menu
          mode={'inline'}
          selectedKeys={uniq([activePath, `s-${pathname}`])}
          openKeys={[activePath]}
          className={styles.menu}
          items={nav.map((item) => ({
            label: <Link to={item.link}>{item.title}</Link>,
            key: item.activePath!,
            children:
              item.activePath === activePath &&
              sidebar?.map((group) => {
                return (
                  !group.link && {
                    label: group.title,

                    type: 'group',
                    children: group.children.map((item) => ({
                      label: (
                        <Link
                          to={item.link}
                          onClick={() => {
                            setOpened(false);
                          }}
                        >
                          {item.title}
                        </Link>
                      ),
                      key: `s-${item.link}`,
                    })),
                  }
                );
              }),
          }))}
        ></Menu>
      </Drawer>
    </Center>
  );
};

export default Burger;
