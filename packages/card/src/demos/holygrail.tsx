import React from 'react';
import ProCard from '@ant-design/pro-card';

export default () => {
  return (
    <>
      <ProCard layout="center" style={{ backgroundColor: '#4A4A4A', color: 'white' }}>
        # Header
      </ProCard>
      <ProCard ghost style={{ height: 400 }}>
        <ProCard colSpan={6} layout="center" style={{ backgroundColor: '#4A90E2' }}>
          # Left
        </ProCard>
        <ProCard colSpan={12} layout="center" style={{ backgroundColor: '#9B9B9B' }}>
          # Content
        </ProCard>
        <ProCard colSpan={6} layout="center" style={{ backgroundColor: '#F56A00' }}>
          # Right
        </ProCard>
      </ProCard>
      <ProCard layout="center" style={{ backgroundColor: '#4A4A4A', color: 'white' }}>
        # Footer
      </ProCard>
    </>
  );
};
