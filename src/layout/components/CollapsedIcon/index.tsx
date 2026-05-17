import { clsx } from 'clsx';
import React from 'react';
import { ArrowSvgIcon } from '../SiderMenu/Arrow';
import { useStyle } from './style';

export const CollapsedIcon: React.FC<any> = (props) => {
  const { isMobile, collapsed, 'data-testid': dataTestId, ...rest } = props;
  const { hashId } = useStyle(props.className);
  if (isMobile && collapsed) return null;
  return (
    <div
      {...rest}
      className={clsx(props.className, hashId, {
        [`${props.className}-collapsed`]: collapsed,
        [`${props.className}-is-mobile`]: isMobile,
      })}
      data-testid={dataTestId || 'pro-layout-collapsed-icon'}
    >
      <ArrowSvgIcon />
    </div>
  );
};
