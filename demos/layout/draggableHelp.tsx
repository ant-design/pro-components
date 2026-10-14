import { ProHelp, ProHelpPanel } from '@ant-design/pro-components';
import { useRef } from 'react';
import Draggable from 'react-draggable';

export default () => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <ProHelp
      dataSource={[
        {
          title: '使用指南',
          key: 'guide',
          children: [
            {
              title: '移动面板',
              key: 'drag',
              children: [
                { valueType: 'h1', children: '拖动帮助面板' },
                {
                  valueType: 'text',
                  children: '按住面板上方的拖动条，在预览区域内移动。',
                },
              ],
            },
          ],
        },
      ]}
    >
      <div style={{ height: 840, position: 'relative', overflow: 'hidden' }}>
        <Draggable nodeRef={nodeRef} handle=".drag-handle" bounds="parent">
          <div
            ref={nodeRef}
            style={{ width: 'min(100%, 640px)', overflowX: 'auto' }}
          >
            <div
              className="drag-handle"
              style={{ padding: 12, background: '#e6f4ff', cursor: 'move' }}
            >
              拖动这里移动帮助面板
            </div>
            <ProHelpPanel defaultSelectedKey="drag" height={280} />
          </div>
        </Draggable>
      </div>
    </ProHelp>
  );
};
