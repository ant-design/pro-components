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
};
