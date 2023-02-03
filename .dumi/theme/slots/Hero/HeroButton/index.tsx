import { Button } from 'antd';
import { FC, ReactNode } from 'react';
import { useStyles } from './style';

interface HeroButtonProps {
  children: ReactNode;
}
const HeroButton: FC<HeroButtonProps> = ({ children }) => {
  const { styles } = useStyles();
  return (
    <Button size={'large'} shape={'round'} type={'primary'} className={styles.button}>
      {children}
    </Button>
  );
};

export default HeroButton;
