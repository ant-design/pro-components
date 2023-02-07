import { useEffect, type FC, type ReactNode } from 'react';
import { useStyles } from './Mask.style';

type MaskProps = {
  visible: boolean;
  children: ReactNode;
  onMaskClick?: () => void;
  onClose?: () => void;
};

export const Mask: FC<MaskProps> = (props) => {
  const { styles } = useStyles();
  useEffect(() => {
    if (props.visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      props.onClose?.();
    }
  }, [props.visible]);

  return props.visible ? (
    <div className={styles.modal}>
      <div className={styles.mask} onClick={props.onMaskClick} />
      <div className={styles.content}>{props.children}</div>
    </div>
  ) : null;
};
