import { ProCard } from '../../components';

export default () => {
  return (
    <ProCard split="vertical">
      <ProCard title="Left Details" colSpan="30%">
        Left Content
      </ProCard>
      <ProCard title="Left and Right Columns with Title" headerBordered>
        <div style={{ height: 360 }}>Right Content</div>
      </ProCard>
    </ProCard>
  );
};
