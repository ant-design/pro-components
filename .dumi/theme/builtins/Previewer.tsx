// @ts-ignore
import PreView, { IPreviewerProps } from 'dumi-theme-default/src/builtins/Previewer';

export default ({
  children,
  ...rest
}: IPreviewerProps & {
  height: string;
  iframe: string;
}) => {
  return (
    <div
      style={{
        height: rest.height && !rest.iframe ? `calc(${rest.height} + 128px)` : undefined,
      }}
    >
      <PreView {...rest}>
        <div
          style={{
            contentVisibility: 'auto',
            contain: 'style layout paint',
            minHeight: rest.height && !rest.iframe ? rest.height : 500,
          }}
        >
          {children}
        </div>
      </PreView>
    </div>
  );
};
