import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { Button } from 'antd';
import { mount, shallow } from 'enzyme';
import { useRef, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

export type TableListItem = {
  key: number;
  name: string;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'createdAt',
    valueType: 'dateTime',
  },
];

// demo
const ProTableSpinDemo = () => {
  const ref = useRef<ProFormInstance>();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState({ spinning: true, delay: 1000 });
  const [polling, setPolling] = useState<any>(undefined);
  return (
    <ProTable<TableListItem>
      columns={columns}
      loading={loading}
      polling={polling}
      request={() =>
        Promise.resolve({
          data: [
            {
              key: 1,
              name: `TradeCode ${1}`,
              createdAt: new Date(),
            },
          ],
          success: true,
        })
      }
      rowKey="key"
      pagination={{
        showSizeChanger: true,
      }}
      search={{
        collapsed,
        onCollapse: setCollapsed,
      }}
      formRef={ref}
      toolBarRender={() => [
        <Button
          key="set"
          onClick={() => {
            if (polling) {
              setPolling(undefined);
              return;
            }
            setPolling(1000);
          }}
        >
          setPolling
        </Button>,
        <Button
          key="submit"
          onClick={() => {
            if (ref.current) {
              ref.current.submit();
            }
          }}
        >
          提交
        </Button>,
      ]}
      postData={(data) => {
        console.log(data, 'fuck');
        setTimeout(() => {
          setLoading({
            ...loading,
            spinning: false,
          });
        }, 3000);
        return data;
      }}
      options={false}
      dateFormatter="string"
      headerTitle="表单赋值"
    />
  );
};

export default ProTableSpinDemo;

describe('ProTable test', () => {
  it('loading and polling props', async () => {
    const html = mount(<ProTable loading={{ spinning: true, delay: 1000 }} polling={2000} />);
    await waitForComponentToPaint(html, 1200);
    act(() => {
      html.setProps({
        loading: { spinning: false, delay: 1000 },
        polling: undefined,
      });
    });
  });

  it('boolean loading and polling props', async () => {
    const html = mount(<ProTable loading={true} polling={2000} />);
    await waitForComponentToPaint(html, 1200);
    act(() => {
      html.setProps({
        loading: false,
        polling: undefined,
      });
    });
  });
});

describe('ProTable 组件测试', () => {
  it('Protable polling', async () => {
    const ProTableSpinComp = require('../../packages/table/src/index').default;
    const wrap = shallow(<ProTableSpinComp />);
    await waitForComponentToPaint(wrap, 1000);
    await waitForComponentToPaint(wrap, 3000);
    expect(wrap.html()).toMatchInlineSnapshot(
      `"<div class=\\"ant-pro-table\\"><div class=\\"ant-pro-card ant-pro-table-search ant-pro-table-search-query-filter\\"><form autoComplete=\\"off\\" class=\\"ant-form ant-form-horizontal ant-pro-form-query-filter\\"><input type=\\"text\\" style=\\"display:none\\"/><div class=\\"ant-row ant-row-start\\" style=\\"margin-left:-12px;margin-right:-12px\\"><div style=\\"padding-left:12px;padding-right:12px;text-align:right\\" class=\\"ant-col ant-col-8 ant-col-offset-16\\"><div class=\\"ant-row ant-form-item pro-form-query-filter-actions\\"><div class=\\"ant-col ant-form-item-label\\"><label class=\\"ant-form-item-no-colon\\" title=\\" \\"> </label></div><div class=\\"ant-col ant-form-item-control\\"><div class=\\"ant-form-item-control-input\\"><div class=\\"ant-form-item-control-input-content\\"><div class=\\"ant-space ant-space-horizontal ant-space-align-center\\"><div class=\\"ant-space-item\\"><div class=\\"ant-space ant-space-horizontal ant-space-align-center\\" style=\\"flex-wrap:wrap;margin-bottom:-8px\\"><div class=\\"ant-space-item\\" style=\\"margin-right:8px;padding-bottom:8px\\"><button type=\\"button\\" class=\\"ant-btn ant-btn-default\\"><span>重 置</span></button></div><div class=\\"ant-space-item\\" style=\\"padding-bottom:8px\\"><button type=\\"button\\" class=\\"ant-btn ant-btn-primary\\"><span>查 询</span></button></div></div></div></div></div></div></div></div></div></div></form></div><div class=\\"ant-pro-card\\"><div class=\\"ant-pro-card-body\\" style=\\"padding-top:0\\"><div class=\\"ant-pro-table-list-toolbar\\"><div class=\\"ant-pro-table-list-toolbar-container\\"><div class=\\"ant-pro-table-list-toolbar-left\\"></div><div class=\\"ant-space ant-space-horizontal ant-space-align-center ant-pro-table-list-toolbar-right\\"><div class=\\"ant-space-item\\"><div class=\\"ant-space ant-space-horizontal ant-space-align-center ant-pro-table-list-toolbar-setting-items\\"><div class=\\"ant-space-item\\" style=\\"margin-right:12px\\"><div class=\\"ant-pro-table-list-toolbar-setting-item\\"><span><span role=\\"img\\" aria-label=\\"reload\\" class=\\"anticon anticon-reload\\"><svg viewBox=\\"64 64 896 896\\" focusable=\\"false\\" data-icon=\\"reload\\" width=\\"1em\\" height=\\"1em\\" fill=\\"currentColor\\" aria-hidden=\\"true\\"><path d=\\"M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z\\"></path></svg></span></span></div></div><div class=\\"ant-space-item\\" style=\\"margin-right:12px\\"><div class=\\"ant-pro-table-list-toolbar-setting-item\\"><span><span role=\\"img\\" aria-label=\\"column-height\\" tabindex=\\"-1\\" class=\\"anticon anticon-column-height ant-dropdown-trigger\\"><svg viewBox=\\"64 64 896 896\\" focusable=\\"false\\" data-icon=\\"column-height\\" width=\\"1em\\" height=\\"1em\\" fill=\\"currentColor\\" aria-hidden=\\"true\\"><path d=\\"M840 836H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm0-724H184c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h656c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zM610.8 378c6 0 9.4-7 5.7-11.7L515.7 238.7a7.14 7.14 0 00-11.3 0L403.6 366.3a7.23 7.23 0 005.7 11.7H476v268h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.5c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H548V378h62.8z\\"></path></svg></span></span></div></div><div class=\\"ant-space-item\\"><div class=\\"ant-pro-table-list-toolbar-setting-item\\"><span role=\\"img\\" aria-label=\\"setting\\" tabindex=\\"-1\\" class=\\"anticon anticon-setting\\"><svg viewBox=\\"64 64 896 896\\" focusable=\\"false\\" data-icon=\\"setting\\" width=\\"1em\\" height=\\"1em\\" fill=\\"currentColor\\" aria-hidden=\\"true\\"><path d=\\"M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z\\"></path></svg></span></div></div></div></div></div></div></div><div class=\\"ant-table-wrapper\\"><div class=\\"ant-spin-nested-loading\\"><div class=\\"ant-spin-container\\"><div class=\\"ant-table ant-table-middle ant-table-empty\\"><div class=\\"ant-table-container\\"><div class=\\"ant-table-content\\"><table style=\\"table-layout:auto\\"><colgroup></colgroup><thead class=\\"ant-table-thead\\"><tr><th class=\\"ant-table-cell\\"></th></tr></thead><tbody class=\\"ant-table-tbody\\"><tr class=\\"ant-table-placeholder\\"><td class=\\"ant-table-cell\\"><div class=\\"ant-empty ant-empty-normal\\"><div class=\\"ant-empty-image\\"><svg class=\\"ant-empty-img-simple\\" width=\\"64\\" height=\\"41\\" viewBox=\\"0 0 64 41\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g transform=\\"translate(0 1)\\" fill=\\"none\\" fill-rule=\\"evenodd\\"><ellipse class=\\"ant-empty-img-simple-ellipse\\" cx=\\"32\\" cy=\\"33\\" rx=\\"32\\" ry=\\"7\\"></ellipse><g class=\\"ant-empty-img-simple-g\\" fill-rule=\\"nonzero\\"><path d=\\"M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z\\"></path><path d=\\"M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z\\" class=\\"ant-empty-img-simple-path\\"></path></g></g></svg></div><div class=\\"ant-empty-description\\">暂无数据</div></div></td></tr></tbody></table></div></div></div></div></div></div></div></div></div>"`,
    );
  });
  it('ProTable 传入object 渲染正常', () => {
    const ProTableSpinComp = require('../../packages/table/src/index').default;
    const state = { spinning: true, delay: 1000 };
    const html = mount(
      <ProTableSpinComp
        poling={1000}
        loading={state}
        postData={(data: any) => {
          setTimeout(() => {
            html.setState({ loading: { ...state, spinning: false } });
          }, 3000);
          return data;
        }}
      />,
    );
  });

  it('ProTable loading boolean 渲染正常', () => {
    const ProTableSpinComp = require('../../packages/table/src/index').default;
    const componentWrapper = shallow(<ProTableSpinComp loading={true} poling={undefined} />);
    expect(componentWrapper.html()).toMatchSnapshot();
  });

  it('ProTable polling boolean 原逻辑不变 渲染正常', () => {
    const ProTableSpinComp = require('../../packages/table/src/index').default;
    const state = { polling: undefined };
    const html = mount(
      <ProTableSpinComp
        loading={true}
        poling={1000}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              if (state) {
                html.setState({ polling: undefined });
                return;
              }
              html.setState({ polling: 2000 });
            }}
          >
            {state ? <LoadingOutlined /> : <ReloadOutlined />}
            {state ? '停止轮询' : '开始轮询'}
          </Button>,
        ]}
      />,
    );
  });

  it('Protable loading polling', async () => {
    const fn = jest.fn();
    const ProTableSpinComp = require('../../packages/table/src/index').default;
    const html = render(
      <ProTableSpinComp
        size="small"
        cardBordered
        columns={columns}
        polling={3000}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            total: 20,
            success: true,
          });
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 1000);
    expect(fn).toBeCalledTimes(1);
  });
});
