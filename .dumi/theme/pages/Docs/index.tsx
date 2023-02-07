import { Helmet, useLocation, useOutlet } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, useEffect, type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

//@ts-ignore
import Content from 'dumi/theme/slots/Content';
//@ts-ignore
import Footer from 'dumi/theme/slots/Footer';
//@ts-ignore
import Header from 'dumi/theme/slots/Header';
//@ts-ignore
import Sidebar from 'dumi/theme/slots/Sidebar';
//@ts-ignore
import Toc from 'dumi/theme/slots/Toc';

import { ApiHeader } from '../../components/ApiHeader';

import { useResponsive } from 'antd-style';
import { isApiPageSel, useSiteStore } from '../../store/useSiteStore';
import { useStyles } from './styles';

const Docs: FC = memo(() => {
  const outlet = useOutlet();
  const { mobile } = useResponsive();
  const fm = useSiteStore((s) => s.routeMeta.frontmatter, isEqual);
  const isApiPage = useSiteStore(isApiPageSel);

  const { styles, theme } = useStyles();

  const location = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [location.pathname]);

  return (
    <div
      className={styles.layout}
      style={
        location.pathname.includes('changelog')
          ? {
              gridTemplateColumns: '0 1fr 300px',
            }
          : {}
      }
    >
      <Header />
      <Toc />
      {mobile ? null : <Sidebar />}
      {isApiPage ? (
        <Flexbox style={{ gridArea: 'title' }}>
          <Center>
            <Flexbox style={{ maxWidth: theme.contentMaxWidth, width: '100%' }}>
              <Flexbox padding={'0 48px'}>
                <ApiHeader title={fm.title} description={fm.description} />
              </Flexbox>
            </Flexbox>
          </Center>
        </Flexbox>
      ) : null}
      <Flexbox
        style={{
          zIndex: 10,
          gridArea: 'main',
          minWidth: 0,
          margin: mobile ? 0 : 24,
          marginBottom: mobile ? 0 : 48,
        }}
      >
        <Center width={'100%'}>
          <Flexbox className={styles.content}>
            <Flexbox horizontal>
              <Content>{outlet}</Content>
            </Flexbox>
          </Flexbox>
        </Center>
      </Flexbox>
      <Footer />
    </div>
  );
});

export default Docs;
