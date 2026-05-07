import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from '../../../provider';
import { isBrowser } from '../../../utils';

const FullScreenIcon: React.FC = () => {
  const intl = useIntl();
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (!isBrowser()) return;
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const { title, Icon } = fullscreen
    ? {
        title: intl.getMessage('tableToolBar.exitFullScreen', '退出全屏'),
        Icon: FullscreenExitOutlined,
      }
    : {
        title: intl.getMessage('tableToolBar.fullScreen', '全屏'),
        Icon: FullscreenOutlined,
      };

  return (
    <Tooltip title={title}>
      <span>
        <Icon />
      </span>
    </Tooltip>
  );
};

export default FullScreenIcon;
