import React from 'react';
import ProCard from '../src/index';

export default () => {
  const evenStyle = {
    backgroundColor: 'rgba(0,146,255,.75)',
    color: '#fff',
  };
  const oddStyle = {
    backgroundColor: '#0092ff',
    color: '#fff',
  };
  return (
    <>
      <ProCard colSpan={24} layout="center" style={oddStyle}>
        colSpan - 24
      </ProCard>
      <ProCard colSpan={16} layout="center" style={evenStyle}>
        colSpan - 16
      </ProCard>
      <ProCard colSpan={8} layout="center" style={oddStyle}>
        colSpan - 8
      </ProCard>
      <ProCard style={{ marginTop: 8 }}>
        <ProCard colSpan={12} layout="center" style={oddStyle}>
          colSpan-12
        </ProCard>
        <ProCard colSpan={6} layout="center" style={evenStyle}>
          colSpan-6
        </ProCard>
        <ProCard colSpan={6} layout="center" style={oddStyle}>
          colSpan-6
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }}>
        <ProCard colSpan={8} layout="center" style={oddStyle}>
          colSpan-8
        </ProCard>
        <ProCard layout="center" style={evenStyle}>
          auto
        </ProCard>
        <ProCard layout="center" style={oddStyle}>
          auto
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }}>
        <ProCard colSpan="200px" layout="center" style={oddStyle}>
          colSpan - 200px
        </ProCard>
        <ProCard layout="center" style={evenStyle}>
          auto
        </ProCard>
        <ProCard layout="center" style={oddStyle}>
          auto
        </ProCard>
      </ProCard>

      <ProCard style={{ marginTop: 8 }}>
        <ProCard style={oddStyle}>auto</ProCard>
        <ProCard colSpan="30%" style={evenStyle}>
          colSpan - 30%
        </ProCard>
      </ProCard>
    </>
  );
};
