import { useSidebarData } from 'dumi';
import { PropsWithChildren, type FC } from 'react';
import { useStyles } from './style';

const Content: FC<PropsWithChildren> = ({ children }) => {
  const sidebar = useSidebarData();

  //FIXME Dumi 关于 loading 的处理不太理想，等这块优化后再补充，或者直接让 dumi 内置该能力
  // const loading = useSiteStore((s) => s.siteData.loading);

  const { styles, cx } = useStyles();
  return (
    <div
      className={cx('dumi-default-content', styles.content)}
      data-no-sidebar={!sidebar || undefined}
    >
      {/*<Skeleton active paragraph loading={loading} style={{ float: 'initial' }} />*/}
      {children}
    </div>
  );
};

export default Content;
