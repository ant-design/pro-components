import { ProSkeleton } from '@ant-design/pro-components';

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <div
      style={{
        background: '#fafafa',
        padding: 24,
      }}
    >
      <ProSkeleton type="descriptions" />
    </div>
  
    </div>
  );
};
