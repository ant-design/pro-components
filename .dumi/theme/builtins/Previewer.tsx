// @ts-ignore
import PreView, { IPreviewerProps } from 'dumi-theme-default/src/builtins/Previewer';
import LazyLoad from 'react-lazyload';
export default ({
  children,
  ...rest
}: IPreviewerProps & {
  height: string;
  iframe: string;
}) => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <PreView {...rest}>
        <div
          style={{
            contentVisibility: 'auto',
            contain: 'style layout paint',
          }}
        >
          {children}
        </div>
      </PreView>
    );
  }

  return (
    <PreView {...rest}>
      <LazyLoad once offset={500}>
        <div
          style={{
            contentVisibility: 'auto',
            contain: 'style layout paint',
          }}
        >
          {children}
        </div>
      </LazyLoad>
    </PreView>
  );
};
