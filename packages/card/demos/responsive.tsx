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
      <ProCard style={{ marginTop: 8 }}>
        <ProCard colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} layout="center" style={oddStyle}>
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 20, sm: 16, md: 12, lg: 8, xl: 4 }}
          layout="center"
          style={evenStyle}
        >
          Col
        </ProCard>
        <ProCard colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} layout="center" style={oddStyle}>
          Col
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }}>
        <ProCard colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }} layout="center" style={oddStyle}>
          Col
        </ProCard>
        <ProCard layout="center" style={evenStyle}>
          Auto
        </ProCard>
        <ProCard layout="center" style={oddStyle}>
          Auto
        </ProCard>
      </ProCard>
      <ProCard style={{ marginTop: 8 }}>
        <ProCard
          colSpan={{
            xs: '50px',
            sm: '100px',
            md: '200px',
            lg: '300px',
            xl: '400px',
          }}
          layout="center"
          style={oddStyle}
        >
          Col
        </ProCard>
        <ProCard layout="center" style={evenStyle}>
          Auto
        </ProCard>
        <ProCard layout="center" style={oddStyle}>
          Auto
        </ProCard>
      </ProCard>

      <ProCard style={{ marginTop: 8 }}>
        <ProCard style={oddStyle}>Auto</ProCard>
        <ProCard
          colSpan={{
            xs: '10%',
            sm: '20%',
            md: '30%',
            lg: '40%',
            xl: '50%',
          }}
          style={evenStyle}
        >
          Col - %
        </ProCard>
      </ProCard>
    </>
  );
};
