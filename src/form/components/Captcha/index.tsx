﻿import type { ButtonProps, InputProps } from 'antd';
import { Button, Form, Input } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import type { ProFormFieldItemProps } from '../../typing';
import { warpField } from '../FormItem/warpField';

export type ProFormCaptchaProps = ProFormFieldItemProps<InputProps> & {
  /** @name 倒计时的秒数 */
  countDown?: number;

  /** 手机号的 name */
  phoneName?: NamePath;

  /** @name 获取验证码的方法 */
  onGetCaptcha: (mobile: string) => Promise<void>;

  /** @name 计时回调 */
  onTiming?: (count: number) => void;

  /** @name 渲染按钮的文字 */
  captchaTextRender?: (timing: boolean, count: number) => React.ReactNode;

  /** @name 获取按钮验证码的props */
  captchaProps?: ButtonProps;

  value?: any;
  onChange?: any;
};

export type CaptFieldRef = {
  startTiming: () => never;
  endTiming: () => never;
};

const BaseProFormCaptcha: React.FC<ProFormCaptchaProps> = ({ ref, ...props }) => {
  const form = Form.useFormInstance();
  const [count, setCount] = useState<number>(props.countDown || 60);
  const [timing, setTiming] = useState(false);
  const [loading, setLoading] = useState<boolean>();
  // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props tabUtil
  const {
    rules,
    name,
    phoneName,
    fieldProps,
    onTiming,
    captchaTextRender = (paramsTiming, paramsCount) => {
      return paramsTiming ? `${paramsCount} 秒后重新获取` : '获取验证码';
    },
    captchaProps,
    ...restProps
  } = props;

  const onGetCaptcha = async (mobile: string) => {
    try {
      setLoading(true);
      await restProps.onGetCaptcha(mobile);
      setLoading(false);
      setTiming(true);
    } catch (error) {
      setTiming(false);
      setLoading(false);

      console.log(error);
    }
  };
  /**
   * 暴露ref方法
   */
  useImperativeHandle(ref, () => ({
    startTiming: () => setTiming(true),
    endTiming: () => setTiming(false),
  }));

  useEffect(() => {
    let interval: any = 0;
    const { countDown } = props;
    if (timing) {
      interval = setInterval(() => {
        setCount((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return countDown || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  useEffect(() => {
    if (onTiming) {
      onTiming(count);
    }
  }, [count, onTiming]);

  return (
    <div
      ref={ref}
      style={{
        ...fieldProps?.style,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Input
        {...fieldProps}
        style={{
          flex: 1,
          transition: 'width .3s',
          marginRight: 8,
          ...fieldProps?.style,
        }}
      />
      <Button
        disabled={timing}
        loading={loading}
        style={{
          display: 'block',
        }}
        {...captchaProps}
        onClick={async () => {
          try {
            if (phoneName) {
              await form.validateFields([phoneName].flat(1) as string[]);
              const mobile = form.getFieldValue([phoneName].flat(1) as string[]);
              await onGetCaptcha(mobile);
            } else {
              await onGetCaptcha('');
            }
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {captchaTextRender(timing, count)}
      </Button>
    </div>
  );
};

const ProFormCaptcha = warpField(BaseProFormCaptcha);

export default ProFormCaptcha;
