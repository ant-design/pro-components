import { EditableProTable } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

afterEach(() => {
  document.body.innerHTML = '';
});

type Row = {
  id: string;
  state?: string;
  decs?: string;
};

const data: Row[] = [{ id: '1', state: 'open', decs: '' }];

/**
 * #9184 formItemProps 为函数时,通过 config.entry 读取行内其它字段的
 * 实时表单值。旧实现 entry 是进入编辑时的快照,不随表单值更新,
 * 导致依赖它的动态 rules(如 required)永不刷新。
 */
describe('EditableProTable dynamic formItemProps rules (#9184)', () => {
  it('state 变化后 formItemProps 收到的 entry.state 是实时值', async () => {
    const user = userEvent.setup();
    const seenEntries: Array<string | undefined> = [];

    const Demo = () => {
      const [editableKeys, setEditableKeys] = React.useState<React.Key[]>([
        '1',
      ]);
      return (
        <EditableProTable<Row>
          rowKey="id"
          defaultValue={data}
          recordCreatorProps={false}
          editable={{
            editableKeys,
            onChange: setEditableKeys,
          }}
          columns={[
            {
              title: '状态',
              dataIndex: 'state',
              valueType: 'select',
              width: 120,
              valueEnum: {
                open: { text: '进行中' },
                closed: { text: '已关闭' },
              },
            },
            {
              title: '描述',
              dataIndex: 'decs',
              formItemProps: (_form, config) => {
                const entry = (config as any)?.entry as Row | undefined;
                seenEntries.push(entry?.state);
                return {
                  rules:
                    entry?.state === 'closed'
                      ? [{ required: true, message: '已关闭必须填写描述' }]
                      : [],
                };
              },
            },
          ]}
        />
      );
    };
    const html = render(<Demo />);
    await waitForWaitTime(400);

    // 初始 open
    expect(seenEntries.includes('open')).toBe(true);
    const beforeCount = seenEntries.length;
    expect(beforeCount).toBeGreaterThan(0);

    // 切换 state → closed
    const stateSelect = html.baseElement.querySelector(
      '.ant-select',
    ) as HTMLElement;
    expect(stateSelect).toBeTruthy();
    await user.click(stateSelect);
    await waitForWaitTime(200);
    const closedOption = await html.findByText('已关闭');
    // 确保点的是下拉选项(下拉浮层在 body 下,findPopupContainer)
    const inDropdown = closedOption.closest('.ant-select-dropdown');
    expect(inDropdown).toBeTruthy();
    await user.click(closedOption);
    await waitForWaitTime(600);

    // formItemProps 重新求值,且能看到 closed 实时值
    expect(seenEntries.length).toBeGreaterThan(beforeCount);
    expect(seenEntries.includes('closed')).toBe(true);
    // 最后一次求值必须是 closed(动态 rules 已切换)
    expect(seenEntries[seenEntries.length - 1]).toBe('closed');
  });
});
