import { ProForm, ProFormTreeSelect } from '@ant-design/pro-components';
import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { act } from 'react';
import { describe, afterEach, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

const treeData = [
  { title: 'Node1', value: '0-0' },
  { title: 'Node2', value: '0-1' },
];

/**
 * #8876 回归: ProFormTreeSelect 设置 onDropdownVisibleChange(旧 API 命名)后,
 * 下拉框仍应能正常展开。
 */
describe('#8876 TreeSelect onDropdownVisibleChange', () => {
  afterEach(() => cleanup());

  it('dropdown still opens when onDropdownVisibleChange is provided', async () => {
    const onDropdownVisibleChange = vi.fn();
    const wrapper = render(
      <ProForm submitter={false}>
        <ProFormTreeSelect
          name="tree"
          label="节点"
          fieldProps={{
            treeData,
            onDropdownVisibleChange,
          }}
        />
      </ProForm>,
    );
    await waitForWaitTime(200);

    act(() => {
      fireEvent.mouseDown(wrapper.container.querySelector('.ant-select')!);
    });
    await waitForWaitTime(300);

    // 下拉树节点应渲染(下拉面板成功展开)
    const treeTitles = document.querySelectorAll('.ant-select-tree-title');
    expect(treeTitles.length).toBeGreaterThan(0);
  });

  it('dropdown opens and calls onOpenChange (new API naming)', async () => {
    const onOpenChange = vi.fn();
    const wrapper = render(
      <ProForm submitter={false}>
        <ProFormTreeSelect
          name="tree"
          label="节点"
          fieldProps={{
            treeData,
            onOpenChange,
          }}
        />
      </ProForm>,
    );
    await waitForWaitTime(200);

    act(() => {
      fireEvent.mouseDown(wrapper.container.querySelector('.ant-select')!);
    });
    await waitForWaitTime(300);

    const treeTitles = document.querySelectorAll('.ant-select-tree-title');
    expect(treeTitles.length).toBeGreaterThan(0);
    expect(onOpenChange).toHaveBeenCalled();
  });
});
