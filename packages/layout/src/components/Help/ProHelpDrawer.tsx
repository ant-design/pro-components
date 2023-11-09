import type { DrawerProps } from 'antd';
import { Drawer } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import type { ProHelpPanelProps } from './ProHelpPanel';
import { ProHelpPanel } from './ProHelpPanel';

export type ProHelpDrawerProps = {
  /**
   * Ant Design Drawer 组件的 Props，可以传递一些选项，如位置、大小、关闭方式等等。
   */
  drawerProps: DrawerProps;
} & Omit<ProHelpPanelProps, 'onClose'>;

/**
 * 渲染一个抽屉，其中显示了一个 ProHelpPanel。
 * @param drawerProps 要传递给 Drawer 组件的属性。
 * @param props 要传递给 ProHelpPanel 组件的属性。
 */
export const ProHelpDrawer: React.FC<ProHelpDrawerProps> = ({
  drawerProps,
  ...props
}) => {
  const [drawerOpen, setDrawerOpen] = useMergedState<boolean>(false, {
    value: drawerProps.open,
    onChange: drawerProps.afterOpenChange,
  });
  return (
    <Drawer
      width={720}
      closeIcon={null}
      styles={{
        header: {
          display: 'none',
        },
        body: {
          padding: 0,
        },
      }}
      maskClosable
      {...drawerProps}
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      afterOpenChange={(open) => {
        setDrawerOpen(open);
      }}
    >
      <ProHelpPanel
        {...props}
        onClose={() => setDrawerOpen(false)}
        bordered={false}
      />
    </Drawer>
  );
};
