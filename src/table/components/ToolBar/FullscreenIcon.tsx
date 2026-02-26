import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from '../../../provider';
import { isBrowser } from '../../../utils';

const FullScreenIcon = React.forwardRef<HTMLSpanElement>((_, ref) => {
  const intl = useIntl();
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    document.onfullscreenchange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
  }, []);
  return fullscreen ? (
    <Tooltip title={intl.getMessage('tableToolBar.exitFullScreen', '全屏')}>
      <span ref={ref}>
        <FullscreenExitOutlined />
      </span>
    </Tooltip>
  ) : (
    <Tooltip title={intl.getMessage('tableToolBar.fullScreen', '全屏')}>
      <span ref={ref}>
        <FullscreenOutlined />
      </span>
    </Tooltip>
  );
});

export default React.memo(FullScreenIcon);
