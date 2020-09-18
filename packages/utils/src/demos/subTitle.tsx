import React from 'react';

import { LabelIconTip } from '@ant-design/pro-utils';

export default () => {
  return (
    <>
      <LabelIconTip label="标题" subTitle={<span>副标题</span>} tip="提示" />
      <LabelIconTip label="标题" subTitle="副标题" tip="提示" />
    </>
  );
};
