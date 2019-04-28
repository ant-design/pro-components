import { Button } from 'antd';
import classNames from 'classnames';
import * as H from 'history';
import React, { createElement } from 'react';
import styles from './index.less';
import config from './typeConfig';
import Link from 'umi/link';

export interface ExceptionProps<
  L = {
    to: H.LocationDescriptor;
    href?: H.LocationDescriptor;
    replace?: boolean;
    innerRef?: (node: HTMLAnchorElement | null) => void;
  }
> {
  type?: '403' | '404' | '500';
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | React.ComponentType<L> | typeof Link;
  style?: React.CSSProperties;
  className?: string;
  backText?: React.ReactNode;
  redirect?: string;
}

class Exception extends React.Component<ExceptionProps, any> {
  static defaultProps = {
    backText: 'back to home',
    redirect: '/',
  };

  constructor(props: ExceptionProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      className,
      backText,
      linkElement = 'a',
      type = '404',
      title,
      desc,
      img,
      actions,
      redirect,
      ...rest
    } = this.props;
    const pageType = type in config ? type : '404';
    const clsString = classNames(styles.exception, className);
    return (
      <div className={clsString} {...rest}>
        <div className={styles.imgBlock}>
          <div
            className={styles.imgEle}
            style={{ backgroundImage: `url(${img || config[pageType].img})` }}
          />
        </div>
        <div className={styles.content}>
          <h1>{title || config[pageType].title}</h1>
          <div className={styles.desc}>{desc || config[pageType].desc}</div>
          <div className={styles.actions}>
            {actions ||
              createElement(
                linkElement as any,
                {
                  to: redirect,
                  href: redirect,
                },
                <Button type="primary">{backText}</Button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;
