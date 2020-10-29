import React, { useEffect } from 'react';
import Layout from 'dumi-theme-default/src/layout';
import { ConfigProvider } from 'antd';
import { IRouteComponentProps } from 'umi';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './layout.less';
moment.locale('zh-cn');

export default ({ children, ...props }: IRouteComponentProps) => {
  useEffect(() => {
    (function (h, o, t, j, a, r) {
      // @ts-ignore
      h.hj =
        // @ts-ignore
        h.hj ||
        function () {
          // @ts-ignore
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      // @ts-ignore
      h._hjSettings = { hjid: 2036108, hjsv: 6 };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      // @ts-ignore
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <Layout {...props}>{children}</Layout>
    </ConfigProvider>
  );
};
