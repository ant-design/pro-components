import React from 'react';
import { Tooltip, Avatar } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export declare type SizeType = number | 'small' | 'default' | 'large';

export interface AvatarItemProps {
  tips: React.ReactNode;
  src: string;
  size?: SizeType;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export interface AvatarListProps {
  Item?: React.ReactElement<AvatarItemProps>;
  size?: SizeType;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItemProps> | Array<React.ReactElement<AvatarItemProps>>;
}

const avatarSizeToClassName = (size?: SizeType) =>
  classNames(styles.avatarItem, {
    [styles.avatarItemLarge]: size === 'large',
    [styles.avatarItemSmall]: size === 'small',
    [styles.avatarItemMini]: size === 'mini',
  });

const Item: React.SFC<AvatarItemProps> = ({ src, size, tips, onClick = () => {} }) => {
  const cls = avatarSizeToClassName(size);

  return (
    <li className={cls} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
        </Tooltip>
      ) : (
        <Avatar src={src} size={size} />
      )}
    </li>
  );
};

const AvatarList: React.SFC<AvatarListProps> & { Item: typeof Item } = ({
  children,
  size,
  maxLength = 5,
  excessItemsStyle,
  ...other
}) => {
  const numOfChildren = React.Children.count(children);
  const numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;
  const childrenArray = React.Children.toArray(children) as Array<
    React.ReactElement<AvatarItemProps>
  >;
  const childrenWithProps = childrenArray.slice(0, numToShow).map(child =>
    React.cloneElement(child, {
      size,
    })
  );

  if (numToShow < numOfChildren) {
    const cls = avatarSizeToClassName(size);

    childrenWithProps.push(
      <li key="exceed" className={cls}>
        <Avatar size={size} style={excessItemsStyle}>{`+${numOfChildren - maxLength}`}</Avatar>
      </li>
    );
  }

  return (
    <div {...other} className={styles.avatarList}>
      <ul> {childrenWithProps} </ul>
    </div>
  );
};

AvatarList.Item = Item;

export default AvatarList;
