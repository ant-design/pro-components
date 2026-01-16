import RcFooter, { FooterProps as RcProps } from 'rc-footer';
import { type FC } from 'react';

import { useStyles } from './style';

export interface FooterProps {
  columns: RcProps['columns'];
  bottom?: RcProps['bottom'];
  theme?: RcProps['theme'];
}
const Footer: FC<FooterProps> = ({ columns, bottom, theme }) => {
  const { container, footer } = useStyles();

  return (
    <div className={container}>
      <RcFooter theme={theme} className={footer} columns={columns} bottom={bottom} />
    </div>
  );
};

export default Footer;
