import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProForm } from '@ant-design/pro-components';
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';

type DataSourceType = {
  id: number | string;
  title?: string;
  children?: DataSourceType[];
};

const columns: ProColumns<DataSourceType>[] = [
  { dataIndex: 'title', title: 'Title' },
];

const defaultData: DataSourceType[] = [
  { id: 'p1', title: 'Parent 1', children: [{ id: 'c1', title: 'Child 1' }] },
  { id: 'p2', title: 'Parent 2' },
];

async function renderNameModeTable(props: {
  rowKey: 'id' | ((record: DataSourceType) => string);
  expandAll?: boolean;
}) {
  let submittedValues: any = null;
  // addEditRecord / startEditable live on actionRef (useActionType spreads editableUtils)
  const actionRef = React.createRef<ActionType>();

  const wrapper = render(
    <ProForm
      initialValues={{ list: defaultData }}
      onFinish={(values) => {
        submittedValues = values;
      }}
    >
      <EditableProTable<DataSourceType>
        name="list"
        rowKey={props.rowKey}
        actionRef={actionRef}
        columns={columns}
        editable={{ type: 'multiple' }}
        recordCreatorProps={false}
        {...(props.expandAll
          ? { expandable: { defaultExpandAllRows: true } }
          : {})}
      />
      <button type="submit">submit</button>
    </ProForm>,
  );
  await waitForWaitTime(200);

  const submit = async () => {
    await act(async () => {
      (
        wrapper.container.querySelector(
          'button[type="submit"]',
        ) as HTMLButtonElement | null
      )?.click();
    });
    await waitForWaitTime(150);
    return submittedValues;
  };

  return {
    wrapper,
    // edit methods are injected at runtime by useActionType, not declared on ActionType
    editable: actionRef.current as unknown as {
      addEditRecord?: (
        record: DataSourceType,
        config?: { parentKey?: React.Key; newRecordType?: string },
      ) => Promise<any>;
      startEditable?: (key: React.Key) => boolean | Promise<any>;
    },
    submit,
  };
}

/**
 * #8893 EditableProTable inside Form (name mode) + multiple row editing:
 * addEditRecord with parentKey breaks tree structure.
 *
 * Case 1: without function rowKey, flattenRecordsToMap uses index as key,
 *   parent ('0') and child ('0') keys collide and overwrite each other,
 *   rebuildTreeStructure loses all children (even self-referencing).
 * Case 2: with function rowKey, cellRender misreads rowKey return value
 *   (business key) as a field name, subName registration fails and the
 *   edit-cell form path is wrong.
 */
describe('#8893 EditableProTable name mode child record', () => {
  it('case 1: name + default rowKey, addEditRecord(parentKey) keeps children', async () => {
    const { wrapper, editable, submit } = await renderNameModeTable({
      rowKey: 'id',
    });

    const before = await submit();
    expect(before.list[0].children?.map((c: any) => c.id)).toEqual(['c1']);

    await act(async () => {
      editable.addEditRecord?.(
        { id: 'c2', title: 'Child of p2' },
        { parentKey: 'p2', newRecordType: 'dataSource' },
      );
    });
    await waitForWaitTime(300);

    const after = await submit();
    // existing children of p1 kept
    expect(after.list[0].children?.map((c: any) => c.id)).toEqual(['c1']);
    // p2 gets the new child
    expect(after.list[1].children?.map((c: any) => c.id)).toEqual(['c2']);
    expect(after.list[1].children[0].title).toBe('Child of p2');
    // internal fields do not leak into submitted values
    expect(after.list[0].children[0].map_row_key).toBeUndefined();
    expect(after.list[1].children[0].map_row_key).toBeUndefined();

    wrapper.unmount();
  });

  it('adds a grandchild to the collided child slot instead of the root', async () => {
    const { wrapper, editable, submit } = await renderNameModeTable({
      rowKey: 'id',
    });

    await act(async () => {
      editable.addEditRecord?.(
        { id: 'g1', title: 'Grandchild' },
        { parentKey: 'c1', newRecordType: 'dataSource' },
      );
    });
    await waitForWaitTime(300);

    const after = await submit();
    expect(after.list[0].children).toHaveLength(1);
    expect(after.list[0].children[0].id).toBe('c1');
    expect(
      after.list[0].children[0].children?.map((row: any) => row.id),
    ).toEqual(['g1']);
    wrapper.unmount();
  });

  it('case 2: name + function rowKey, addEditRecord(parentKey) keeps children', async () => {
    const { wrapper, editable, submit } = await renderNameModeTable({
      rowKey: (record) => String(record.id),
    });

    const before = await submit();
    expect(before.list[0].children?.map((c: any) => c.id)).toEqual(['c1']);

    await act(async () => {
      editable.addEditRecord?.(
        { id: 'c2', title: 'Child of p2' },
        { parentKey: 'p2', newRecordType: 'dataSource' },
      );
    });
    await waitForWaitTime(300);

    const after = await submit();
    expect(after.list[0].children?.map((c: any) => c.id)).toEqual(['c1']);
    expect(after.list[1].children?.map((c: any) => c.id)).toEqual(['c2']);
    expect(after.list[1].children[0].title).toBe('Child of p2');
    expect(after.list[0].children[0].map_row_key).toBeUndefined();

    wrapper.unmount();
  });

  it('case 2 extra: function rowKey expanded, new child input writes back to correct path', async () => {
    const { wrapper, editable, submit } = await renderNameModeTable({
      rowKey: (record) => String(record.id),
      expandAll: true,
    });

    await act(async () => {
      editable.addEditRecord?.(
        { id: 'c2', title: 'Child of p2' },
        { parentKey: 'p2', newRecordType: 'dataSource' },
      );
    });
    await waitForWaitTime(300);

    // new child row is in edit mode with default value
    const input = wrapper.container.querySelector(
      'tr:last-child input',
    ) as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe('Child of p2');

    // editing writes to the correct form path (list[1].children[0].title)
    await act(async () => {
      fireEvent.change(input, { target: { value: 'edited-c2' } });
    });
    await waitForWaitTime(150);

    const after = await submit();
    expect(after.list[1].children[0].title).toBe('edited-c2');
    expect(after.list[0].children[0].title).toBe('Child 1');

    wrapper.unmount();
  });

  it('case 1 extra: default rowKey expanded, editing existing child writes correct path', async () => {
    const { wrapper, editable, submit } = await renderNameModeTable({
      rowKey: 'id',
      expandAll: true,
    });

    // start editing existing child c1
    await act(async () => {
      editable.startEditable?.('c1');
    });
    await waitForWaitTime(300);

    // c1 edit input shows original value (subName registered -> path list[0].children[0].title)
    const rowInputs = wrapper.container.querySelectorAll(
      'tr.ant-table-row-level-1 input',
    );
    expect(rowInputs.length).toBeGreaterThan(0);
    expect((rowInputs[0] as HTMLInputElement).value).toBe('Child 1');

    await act(async () => {
      fireEvent.change(rowInputs[0], { target: { value: 'edited-c1' } });
    });
    await waitForWaitTime(150);

    const after = await submit();
    expect(after.list[0].children[0].title).toBe('edited-c1');

    wrapper.unmount();
  });
});
