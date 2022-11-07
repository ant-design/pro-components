import { version } from 'antd';
import { omitUndefined } from '../omitUndefined';
import { compareVersions } from './index';

const openVisibleCompatible = (open: boolean | undefined, onOpenChange?: any) => {
  const props =
    compareVersions(process?.env?.ANTD_VERSION || version, '4.23.0') > -1
      ? {
          open: open,
          onOpenChange: onOpenChange,
        }
      : {
          visible: open,
          onVisibleChange: onOpenChange,
        };

  return omitUndefined(props);
};

export { openVisibleCompatible };
