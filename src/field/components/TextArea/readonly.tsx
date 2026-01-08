import { omit } from '@rc-component/util';
import { ConfigProvider } from 'antd';
import classNames from 'clsx';
import React, { useContext } from 'react';
import { useStyle } from '../../../utils';
import type { ProFieldFC } from '../../PureProField';

/**
 * Input.TextArea 只读模式时渲染的组件
 *
 * @param
 */
const FieldTextAreaReadonly: ProFieldFC<{
  text: string;
}> = ({ text, fieldProps }, ref) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const readonlyClassName = getPrefixCls('pro-field-readonly');
  const compClassName = `${readonlyClassName}-textarea`;

  const { wrapSSR, hashId } = useStyle('TextArea', () => {
    return {
      [`.${compClassName}`]: {
        display: 'inline-block',
        lineHeight: '1.5715',
        maxWidth: '100%',
        whiteSpace: 'pre-wrap',
      },
    };
  });

  return wrapSSR(
    <span
      ref={ref}
      className={classNames(hashId, readonlyClassName, compClassName)}
      {...omit(fieldProps, ['autoSize', 'classNames', 'styles'])}
    >
      {text ?? '-'}
    </span>,
  );
};

export default React.forwardRef(FieldTextAreaReadonly);
