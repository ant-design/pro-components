import { NavLink } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, type FC } from 'react';

import { useSiteStore } from '../../store/useSiteStore';
import { useStyles } from './style';

const Sidebar: FC = () => {
  const sidebar = useSiteStore((s) => s.sidebar, isEqual);
  const { styles } = useStyles();

  return (
    sidebar && (
      <div className={styles.sidebar}>
        {sidebar.map((item, i) => (
          <dl key={String(i)}>
            {item.title && <dt>{item.title}</dt>}
            {item.children.map((child) => (
              <dd key={child.link}>
                <NavLink to={child.link} title={child.title} end>
                  {child.title}
                </NavLink>
              </dd>
            ))}
          </dl>
        ))}
      </div>
    )
  );
};

export default memo(Sidebar);
