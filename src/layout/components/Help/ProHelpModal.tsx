import { useMergedState } from '@rc-component/util';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import type { ProHelpPanelProps } from './ProHelpPanel';
import { ProHelpPanel } from './ProHelpPanel';
export type ProHelpModalProps = {
  /**
   * Ant Design Modal 组件的 props，可以传递一些选项，如位置、大小、关闭方式等等。
   */
  modalProps?: ModalProps;
} & Omit<ProHelpPanelProps, 'onClose'>;

/**
 * 渲染一个模态对话框，其中显示了一个 ProHelpPanel。
 * @param modalProps 要传递给 Modal 组件的属性。
 * @param props 要传递给 ProHelpPanel 组件的属性。
 */
export const ProHelpModal: React.FC<ProHelpModalProps> = ({ modalProps, ...props }) => {
  const [modalOpen, setModalOpen] = useMergedState<boolean>(false, {
    value: modalProps?.open,
    onChange: modalProps?.afterClose,
  });
  return (
    <Modal
      centered
      maskClosable
      closable={false}
      footer={null}
      open={modalOpen}
      styles={{
        body: {
          margin: -24,
        },
      }}
      width={720}
      onCancel={() => {
        setModalOpen(false);
      }}
      {...modalProps}
    >
      <ProHelpPanel height={648} {...props} onClose={() => setModalOpen(false)} />
    </Modal>
  );
};
