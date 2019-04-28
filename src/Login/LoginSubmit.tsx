import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'antd';
import styles from './index.less';
import { ButtonProps } from 'antd/lib/button';
const FormItem = Form.Item;

export interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.SFC<LoginSubmitProps> = ({ className, ...rest }) => {
  const clsString = classNames(styles.submit, className);
  return (
    <FormItem>
      <Button
        size="large"
        className={clsString}
        type="primary"
        htmlType="submit"
        {...rest}
      />
    </FormItem>
  );
};

export default LoginSubmit;
