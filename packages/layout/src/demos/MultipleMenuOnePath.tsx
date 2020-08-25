import React from 'react';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';

export default () => (
  <div
    style={{
      height: 400,
      overflow: 'auto',
    }}
  >
    <ProLayout
      location={{
        pathname: '/config/template/new',
      }}
      route={{
        routes: [
          {
            path: '/config',
            name: '配置中心',
            routes: [
              {
                path: 'product',
                name: '产品配置',
                indexRoute: {
                  component: 'ConfigProduct/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ConfigProduct/NewConfig',
                  },
                  {
                    path: 'edit/:productKey',
                    component: 'ConfigProduct/NewConfig',
                  },
                  {
                    path: 'detail/:productKey',
                    component: 'ConfigProduct/Detail',
                  },
                ],
              },
              {
                path: 'productManage',
                name: '产品管理',
                indexRoute: {
                  component: 'ConfigProductAll/index',
                },
                routes: [
                  {
                    path: 'detail/:productKey',
                    component: 'ConfigProductAll/Detail',
                  },
                ],
              },
              {
                path: 'template',
                name: '产品模板管理',
                indexRoute: {
                  component: 'ConfigTemplate/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ConfigTemplate/NewConfig',
                  },
                  {
                    path: 'edit/:templateKey',
                    component: 'ConfigTemplate/NewConfig',
                  },
                  {
                    path: 'detail/:templateKey',
                    component: 'ConfigTemplate/Detail',
                  },
                ],
              },
              {
                path: 'configItem',
                name: '配置项模板管理',
                indexRoute: {
                  component: 'ConfigItem/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'ConfigItem/NewConfig',
                  },
                  {
                    path: 'edit/:productKey',
                    component: 'ConfigItem/NewConfig',
                  },
                  {
                    path: 'detail/:productKey',
                    component: 'ConfigItem/Detail',
                  },
                ],
              },
              {
                path: 'meta',
                name: '元数据管理',
                component: 'ConfigMeta',
              },
            ],
          },
          {
            path: 'asset',
            name: '资产',
            routes: [
              {
                path: 'query',
                name: '资产查询',
                component: 'Asset',
              },
              {
                path: 'collateral',
                name: '抵押查询',
                component: 'Collateral',
              },
            ],
          },
          {
            path: 'bill',
            name: '账单',
            routes: [
              {
                path: 'billNo',
                name: '账单编号',
                component: 'BillNo',
              },
              {
                path: 'bill',
                name: '账单查询',
                component: 'Bill',
              },
              {
                path: 'billItem',
                name: '账单条目',
                component: 'BillItem',
              },
            ],
          },
          {
            path: 'cif',
            name: 'CIF',
            routes: [
              {
                path: 'bankAccount',
                name: '绑卡信息',
                component: 'CifBankAccount',
              },
              {
                path: 'userGroup',
                name: '查询 Group',
                component: 'CifUserGroup',
              },
              {
                path: 'userId',
                name: '查询 ID',
                component: 'CifUserId',
              },
              {
                path: 'newInstitution',
                name: '新增机构',
                indexRoute: {
                  component: 'CifNewInstitution/index',
                },
                routes: [
                  {
                    path: 'new',
                    component: 'CifNewInstitution/ApplyNew',
                  },
                  {
                    path: 'bind/:id',
                    component: 'CifNewInstitution/BindAccount',
                  },
                ],
              },
            ],
          },
          {
            path: 'tools',
            name: '小工具',
            routes: [
              {
                path: 'ttsql',
                name: 'MySQL转BlinkTT流表',
                component: 'ToolTT',
              },
            ],
          },
        ],
      }}
    >
      <PageContainer content="欢迎使用">
        <div>Hello World</div>
      </PageContainer>
    </ProLayout>
  </div>
);
