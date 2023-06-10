import {
  LightFilter,
  ProFormCascader,
  ProFormText,
  ProFormTreeSelect,
  QueryFilter,
} from '@ant-design/pro-form';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { TreeSelect } from 'antd';
import { _el, _rs } from 'rc-resize-observer/lib/utils/observerUtil';
import { waitForWaitTime } from '../util';

describe('✔️ ProFormLightFilter', () => {
  afterEach(() => {
    cleanup();
  });
  it(' ✔️ clear input values', async () => {
    const html = render(
      <LightFilter>
        <ProFormText
          name="name1"
          label="名称"
          fieldProps={{
            role: 'name_input',
          }}
        />
      </LightFilter>,
    );

    await act(async () => {
      (await html.findByText('名称'))?.click();
    });

    await waitFor(() => {
      return html.findByRole('name_input');
    });

    await act(async () => {
      const dom = await html.findByRole('name_input');
      fireEvent.change(dom, {
        target: {
          value: 'qixian',
        },
      });
    });

    await waitFor(() => {
      return html.findAllByText('确 认');
    });

    await act(async () => {
      (await html.findAllByText('确 认')).at(0)?.click();
    });

    const dom = await html.findAllByTitle('qixian');

    expect(dom.length > 0).toBeTruthy();

    await act(async () => {
      (await html.findAllByTitle('qixian')).at(0)?.click();
      (await html.findAllByText('清除')).at(0)?.parentElement?.click();
    });

    await act(async () => {
      (await html.findAllByText('确 认')).at(0)?.click();
    });
    await waitFor(() => {
      return html.findAllByText('名称');
    });
    expect(!!(await html.findByText('名称'))).toBeTruthy();
  });
  it(' ✔️ QueryFilter resize', async () => {
    const html = render(
      <QueryFilter>
        <ProFormText name="name1" label="名称" />
      </QueryFilter>,
    );

    await act(async () => {
      (await html.findByText('名称'))?.click();
    });
    await waitForWaitTime(200);

    await waitForWaitTime(200);

    const dom = html.baseElement.querySelector('form')!;
    // @ts-ignore
    dom.getBoundingClientRect = () => {
      return {
        x: 0,
        y: 0,
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 200,
      };
    };

    /** 复制一下方法，方便使用 */
    // 为了mock 好辛苦
    _el.forEach((value) => {
      _el.set(dom!, value);
    });

    act(() => {
      _rs([
        // @ts-ignore
        {
          target: dom!,
        },
      ]);
    });
  });

  it(' ✔️ lightFilter resize', async () => {
    const html = render(
      <LightFilter>
        <ProFormTreeSelect
          fieldProps={{
            fieldNames: {
              label: 'title',
            },
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            placeholder: 'Please select',
          }}
          request={async () => {
            return [
              {
                title: 'Node1',
                value: '0-0',
                children: [
                  {
                    title: 'Child Node1',
                    value: '0-0-0',
                  },
                ],
              },
              {
                title: 'Node2',
                value: '0-1',
                children: [
                  {
                    title: 'Child Node3',
                    value: '0-1-0',
                  },
                  {
                    title: 'Child Node4',
                    value: '0-1-1',
                  },
                  {
                    title: 'Child Node5',
                    value: '0-1-2',
                  },
                ],
              },
            ];
          }}
          initialValue={['0-0', '0-1']}
          name="area"
          label="名称"
        />
      </LightFilter>,
    );
    expect(html.baseElement.querySelector('.ant-select-open')).toBe(null);

    await act(async () => {
      const dom = await html.baseElement.querySelector<HTMLSpanElement>(
        '.ant-pro-core-field-label-text',
      );
      dom?.click?.();
    });
    await act(async () => {
      const dom = await html.baseElement.querySelector<HTMLSpanElement>(
        '.ant-pro-core-field-label-close',
      );
      dom?.click?.();
    });
    expect(html.baseElement.querySelector('.ant-select-open')).not.toBe(null);
  });

  it(' ✔️ lightFilter ProFormCascader support label', async () => {
    const html = render(
      <LightFilter>
        <ProFormCascader
          request={async () => [
            {
              value: 'zhejiang',
              label: '浙江',
              children: [
                {
                  value: 'hangzhou',
                  label: '杭州',
                  children: [
                    {
                      value: 'xihu',
                      label: '西湖',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ]}
          name="area"
          initialValue={['zhejiang', 'hangzhou', 'xihu']}
          label="名称"
        />
      </LightFilter>,
    );
    expect(html.baseElement.querySelector('.ant-select-open')).toBe(null);

    await act(async () => {
      const dom = await html.baseElement.querySelector<HTMLSpanElement>(
        '.ant-pro-core-field-label-text',
      );
      dom?.click?.();
    });
    await act(async () => {
      const dom = await html.baseElement.querySelector<HTMLSpanElement>(
        '.ant-pro-core-field-label-close',
      );
      dom?.click?.();
    });

    expect(html.baseElement.querySelector('.ant-select-open')).not.toBe(null);
  });
});
