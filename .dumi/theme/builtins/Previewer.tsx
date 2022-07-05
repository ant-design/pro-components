// @ts-ignore
import ProSkeleton from '@ant-design/pro-skeleton';
import { Spin } from 'antd';
import PreView, { IPreviewerProps } from 'dumi-theme-default/src/builtins/Previewer';
import LazyLoad from 'react-lazyload';
import { isBrowser } from 'umi';

export default ({
  children,
  ...rest
}: IPreviewerProps & {
  height: string;
}) => {
  if (!isBrowser()) {
    return null;
  }
  return (
    <div
      style={{
        height: rest.height ? `calc(${rest.height} + 128px)` : undefined,
      }}
    >
      <LazyLoad
        height={`calc(${rest.height || rest.iframe} + 128px)` || 500}
        offset={500}
        placeholder={
          parseInt(rest.height) > 300 ? (
            <div
              className="__dumi-default-previewer"
              style={{
                padding: 24,
                background: 'rgb(245, 245, 245)',
              }}
            >
              <ProSkeleton type="descriptions" />
            </div>
          ) : (
            <div style={{ paddingTop: 100, textAlign: 'center' }}>
              <Spin size="large" />
            </div>
          )
        }
        once
      >
        <PreView {...rest}>
          <div
            style={{
              minHeight: rest.height,
            }}
          >
            {children}
          </div>
        </PreView>
      </LazyLoad>
    </div>
  );
};
