import type { InputProps } from 'antd';
import { Badge, Input, Form } from 'antd';
import React, { useCallback, useState, useEffect } from 'react';
import createField from '../../BaseForm/createField';
import type { ProFormFieldItemProps } from '../../interface';

export type ImageCaptcha = {
  /** @图形验证码 */
  captchaImage?: string;

  /** @ */
  validityInSeconds?: number;
};

export type ProFormImageCaptchaProps = ProFormFieldItemProps<InputProps> & {
  /** @name 验证码 */
  captcha?: ImageCaptcha;

  /** @name 获取验证码的方法 */
  onGetCaptcha: () => Promise<void>;

  value?: any;

  onChange?: any;
};

const ProFormImageCaptcha: React.FC<ProFormImageCaptchaProps> = React.forwardRef(
  (props, ref: any) => {
    const [timing, setTiming] = useState(false);
    const { captcha, rules, name, fieldProps, value, onChange, ...restProps } = props;
    const [count, setCount] = useState<number>(0);

    const onGetCaptcha = useCallback(async () => {
      try {
        await restProps.onGetCaptcha();
        setTiming(true);
      } catch (error) {
        console.log(error);
      }
    }, []);

    useEffect(() => {
      let interval: number = 0;
      if (timing) {
        interval = window.setInterval(() => {
          setCount((preSecond) => {
            if (preSecond <= 1) {
              setTiming(false);
              clearInterval(interval);
              onGetCaptcha().then(null);
              return captcha?.validityInSeconds || 0;
            }
            return preSecond - 1;
          });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [timing]);

    useEffect(() => {
      setCount(captcha?.validityInSeconds || 0);
    }, [captcha]);

    useEffect(() => {
      onGetCaptcha().then(null);
    }, []);

    return (
      <Form.Item noStyle shouldUpdate>
        {() => (
          <div
            style={{
              ...fieldProps?.style,
              display: 'flex',
              alignItems: 'center',
            }}
            ref={ref}
          >
            <Input
              {...fieldProps}
              style={{
                flex: 1,
                transition: 'width .3s',
                marginRight: 8,
              }}
            />
            <Badge count={count} overflowCount={999}>
              <img
                alt="Image"
                style={{ width: '128px', height: '40px' }}
                src={captcha?.captchaImage}
                onClick={async () => {
                  await onGetCaptcha();
                }}
              />
            </Badge>
          </div>
        )}
      </Form.Item>
    );
  },
);

export default createField(ProFormImageCaptcha);
