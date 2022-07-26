import classNames from 'classnames';
import { ArrowSvgIcon } from '../SiderMenu/Arrow';
import { useStyle } from './style';

export const CollapsedIcon: React.FC<any> = (props) => {
  const { isMobile, collapsed, ...rest } = props;
  const { wrapSSR, hashId } = useStyle(props.className);
  if (isMobile && collapsed) return null;
  return wrapSSR(
    <div
      {...rest}
      className={classNames(props.className, hashId, {
        [`${props.className}-collapsed`]: collapsed,
        [`${props.className}-is-mobile`]: isMobile,
      })}
    >
      <ArrowSvgIcon />
    </div>,
  );
};
