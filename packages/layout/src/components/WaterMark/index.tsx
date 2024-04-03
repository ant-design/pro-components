import { useToken } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';

import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';

export type WaterMarkProps = {
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
  /** 水印样式 */
  markStyle?: React.CSSProperties;
  /** 水印类名 */
  markClassName?: string;
  /** 水印之间的水平间距 */
  gapX?: number;
  /** 水印之间的垂直间距 */
  gapY?: number;
  /** 追加的水印元素的z-index */
  zIndex?: number;
  /** 水印的宽度 */
  width?: number;
  /** 水印的高度 */
  height?: number;
  /** 水印在canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 offsetTop = gapY / 2 */
  offsetTop?: number; // 水印图片距离绘制 canvas 单元的顶部距离
  /** 水印在canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 offsetTop = gapX / 2 */
  offsetLeft?: number;
  /** 水印绘制时，旋转的角度，单位 ° */
  rotate?: number;
  /** ClassName 前缀 */
  prefixCls?: string;
  /** 高清印图片源, 为了高清屏幕显示，建议使用 2倍或3倍图，优先使用图片渲染水印。 */
  image?: string;
  /** 水印文字内容 */
  content?: string | string[];
  /** 文字颜色 */
  fontColor?: string;
  /** 文字样式 */
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
  /** 文字族 */
  fontFamily?: string;
  /** 文字粗细 */
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  /** 文字大小 */
  fontSize?: number | string;

  children?: React.ReactNode;
};
/**
 * 返回当前显示设备的物理像素分辨率与CSS像素分辨率之比
 *
 * @param context
 * @see api 有些废弃了，其实类型 CanvasRenderingContext2D
 */
const getPixelRatio = (context: any) => {
  if (!context) {
    return 1;
  }
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};

export const WaterMark: React.FC<WaterMarkProps> = (props) => {
  const { token } = useToken();
  const {
    children,
    style,
    className,
    markStyle,
    markClassName,
    // antd 内容层 zIndex 基本上在 10 以下 https://github.com/ant-design/ant-design/blob/6192403b2ce517c017f9e58a32d58774921c10cd/components/style/themes/default.less#L335
    zIndex = 9,
    gapX = 212,
    gapY = 222,
    width = 120,
    height = 64,
    rotate = -22, // 默认旋转 -22 度
    image,
    offsetLeft,
    offsetTop: outOffsetTop,
    fontStyle = 'normal',
    fontWeight = 'normal',
    fontColor = token.colorFill,
    fontSize = 16,
    fontFamily = 'sans-serif',
    prefixCls: customizePrefixCls,
  } = props;

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-layout-watermark', customizePrefixCls);
  const wrapperCls = classNames(`${prefixCls}-wrapper`, className);
  const waterMarkCls = classNames(prefixCls, markClassName);
  const [base64Url, setBase64Url] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const ratio = getPixelRatio(ctx);

    const canvasWidth = `${(gapX + width) * ratio}px`;
    const canvasHeight = `${(gapY + height) * ratio}px`;
    const canvasOffsetLeft = offsetLeft || gapX / 2;
    const canvasOffsetTop = outOffsetTop || gapY / 2;

    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);

    if (!ctx) {
      // eslint-disable-next-line no-console
      console.error('当前环境不支持Canvas');
      return;
    }

    // 旋转字符 rotate
    ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
    ctx.rotate((Math.PI / 180) * Number(rotate));
    const markWidth = width * ratio;
    const markHeight = height * ratio;

    const writeContent = (
      contentText: string | string[],
      offsetTop: number = 0,
    ) => {
      const markSize = Number(fontSize) * ratio;
      ctx.font = `${fontStyle} normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
      ctx.fillStyle = fontColor;
      if (Array.isArray(contentText)) {
        contentText?.forEach((item: string, index: number) =>
          ctx.fillText(item, 0, index * markSize + offsetTop),
        );
      } else {
        ctx.fillText(contentText, 0, offsetTop ? offsetTop + markSize : 0);
      }
      setBase64Url(canvas.toDataURL());
    };

    if (image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.src = image;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, markWidth, markHeight);
        setBase64Url(canvas.toDataURL());
        if (props.content) {
          writeContent(props.content, img.height + 8);
          return;
        }
      };
      return;
    }
    if (props.content) {
      writeContent(props.content);
      return;
    }
  }, [
    gapX,
    gapY,
    offsetLeft,
    outOffsetTop,
    rotate,
    fontStyle,
    fontWeight,
    width,
    height,
    fontFamily,
    fontColor,
    image,
    props.content,
    fontSize,
  ]);

  return (
    <div
      style={{
        position: 'relative',
        ...style,
      }}
      className={wrapperCls}
    >
      {children}
      <div
        className={waterMarkCls}
        style={{
          zIndex,
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundSize: `${gapX + width}px`,
          pointerEvents: 'none',
          backgroundRepeat: 'repeat',
          ...(base64Url
            ? {
                backgroundImage: `url('${base64Url}')`,
              }
            : {}),
          ...markStyle,
        }}
      />
    </div>
  );
};
