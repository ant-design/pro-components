import React from 'react';
import { LightFilter, QueryFilter, ProFormText } from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { waitTime } from '../util';
import { _el, _rs } from 'rc-resize-observer/lib/utils/observerUtil';

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
    await waitTime(200);

    await act(async () => {
      const dom = await html.findByRole('name_input');
      fireEvent.change(dom, {
        target: {
          value: 'qixian',
        },
      });
    });

    await waitTime(200);

    await act(async () => {
      (await html.findAllByText('确 认')).at(0)?.click();
    });

    await waitTime(200);

    const dom = await html.findAllByTitle('qixian');

    expect(dom.length > 0).toBeTruthy();

    await act(async () => {
      (await html.findAllByTitle('qixian')).at(0)?.click();
      (await html.findAllByText('清除')).at(0)?.parentElement?.click();
    });
    await waitTime(500);

    await act(async () => {
      (await html.findAllByText('确 认')).at(0)?.click();
    });

    await waitTime(200);
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
    await waitTime(200);

    await waitTime(200);

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
});
