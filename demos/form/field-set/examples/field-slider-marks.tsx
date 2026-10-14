import { ProForm, ProFormSlider } from '@ant-design/pro-components';

export default () => (
  <div style={{ paddingInline: 16 }}>
    <ProForm submitter={false} initialValues={{ progress: 50 }}>
      <ProFormSlider
        name="progress"
        label="进度"
        marks={{ 0: '开始', 50: '进行中', 100: '完成' }}
      />
    </ProForm>
  </div>
);
