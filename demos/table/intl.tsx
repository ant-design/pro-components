import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider, Select, Space } from 'antd';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import zhCN from 'antd/locale/zh_CN';
import { useState } from 'react';

type Service = { id: number; name: string };
type Language = 'zh-CN' | 'en-US' | 'ja-JP';

const locales = { 'zh-CN': zhCN, 'en-US': enUS, 'ja-JP': jaJP };
const services: Service[] = [
  { id: 1, name: '用户服务' },
  { id: 2, name: '订单服务' },
];
const columns: ProColumns<Service>[] = [
  { title: '服务名称', dataIndex: 'name' },
];

export default () => {
  const [language, setLanguage] = useState<Language>('zh-CN');

  return (
    <div style={{ padding: 24 }}>
      <ConfigProvider locale={locales[language]}>
        <ProTable<Service>
          columns={columns}
          rowKey="id"
          options={false}
          pagination={false}
          headerTitle={
            <Space wrap>
              <span>ConfigProvider.locale</span>
              <Select<Language>
                aria-label="选择语言"
                value={language}
                onChange={setLanguage}
                options={[
                  { value: 'zh-CN', label: '简体中文' },
                  { value: 'en-US', label: 'English' },
                  { value: 'ja-JP', label: '日本語' },
                ]}
              />
            </Space>
          }
          request={async ({ name }) => {
            const data = services.filter((item) =>
              item.name.includes(String(name || '')),
            );
            return { data, total: data.length, success: true };
          }}
        />
      </ConfigProvider>
    </div>
  );
};
