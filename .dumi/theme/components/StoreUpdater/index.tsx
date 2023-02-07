import { useLocation } from '@@/exports';
import { useNavData, useRouteMeta, useSidebarData, useSiteData } from 'dumi';
import isEqual from 'fast-deep-equal';
import { memo, useEffect } from 'react';
import { useSiteStore } from '../../store/useSiteStore';

export const StoreUpdater = memo(() => {
  const siteData = useSiteData();
  const sidebar = useSidebarData();
  const routeMeta = useRouteMeta();
  const navData = useNavData();
  const location = useLocation();

  useEffect(() => {
    const { setLoading, ...data } = siteData;
    const {
      siteData: { setLoading: _, ...prevData },
    } = useSiteStore.getState();

    if (isEqual(data, prevData)) return;

    useSiteStore.setState({ siteData });
  }, [siteData]);

  useEffect(() => {
    useSiteStore.setState({ sidebar });
  }, [sidebar]);

  useEffect(() => {
    useSiteStore.setState({ routeMeta });
  }, [routeMeta]);

  useEffect(() => {
    useSiteStore.setState({ navData });
  }, [navData]);

  useEffect(() => {
    useSiteStore.setState({ location });
  }, [location]);

  return null;
});
