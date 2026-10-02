import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BetaSchemaForm } from '../../src';

/**
 * #8561 BetaSchemaForm columns 为 formList 时，title 拿不到 formlist 的 index
 *
 * schema 的 title / fieldProps / formItemProps 支持函数形式，
 * 但 formList 的子 columns 是编译期静态生成的，函数在求值时行号尚不存在。
 * 修复后：formList 内层 columns 的函数式 props 以 render-prop 按行求值，
 * title 函数可以拿到当前行的 rowIndex。
 */
describe('#8561 SchemaForm formList title 拿不到 index', () => {
  it('title 函数在 formList 子列中可以拿到行号', () => {
    const columns = [
      {
        valueType: 'formList',
        dataIndex: 'flowNodeApplyReqList',
        initialValue: [{ displayName: 'a' }, { displayName: 'b' }],
        fieldProps: {
          alwaysShowItemLabel: true,
        },
        columns: [
          {
            title: '',
            valueType: 'group',
            columns: [
              {
                // #8561 期望 title 函数可以拿到 schema + 第四个参数 rowIndex
                title: (
                  schema: any,
                  type: any,
                  dom: any,
                  rowIndex?: number,
                ) => <div>{`院区名称${rowIndex ?? '-'}`}</div>,
                dataIndex: 'displayName',
                colProps: { span: 24 },
              },
            ],
          },
        ],
      },
    ];

    const { container, getAllByText } = render(
      <BetaSchemaForm columns={columns as any} />,
    );

    // 两行数据，title 应携带各自的行号
    expect(getAllByText('院区名称0').length).toBe(1);
    expect(getAllByText('院区名称1').length).toBe(1);
    expect(
      container.querySelectorAll('.ant-form-item-control-input').length,
    ).toBeGreaterThan(0);
  });

  it('fieldProps / formItemProps 函数在 formList 子列中可以拿到 config.rowIndex', () => {
    const fieldPropsRowIndexes: number[] = [];
    const formItemPropsRowIndexes: number[] = [];

    const columns = [
      {
        valueType: 'formList',
        dataIndex: 'list',
        initialValue: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
        columns: [
          {
            dataIndex: 'name',
            title: '名称',
            fieldProps: (_form: any, config: any) => {
              fieldPropsRowIndexes.push(config.rowIndex);
              return { placeholder: `第${config.rowIndex}行` };
            },
            formItemProps: (_form: any, config: any) => {
              formItemPropsRowIndexes.push(config.rowIndex);
              return {};
            },
          },
        ],
      },
    ];

    const { getAllByPlaceholderText } = render(
      <BetaSchemaForm columns={columns as any} />,
    );

    // 三行数据，placeholder 按行号生成
    expect(getAllByPlaceholderText('第0行').length).toBe(1);
    expect(getAllByPlaceholderText('第1行').length).toBe(1);
    expect(getAllByPlaceholderText('第2行').length).toBe(1);
    // 函数式 props 拿到的 rowIndex 覆盖所有行（重渲染会多次调用，取去重集合）
    expect([...new Set(fieldPropsRowIndexes)].sort()).toEqual([0, 1, 2]);
    expect([...new Set(formItemPropsRowIndexes)].sort()).toEqual([0, 1, 2]);
  });

  it('nested formList columns use the inner row index', () => {
    const columns = [
      {
        valueType: 'formList',
        dataIndex: 'groups',
        initialValue: [{ members: [{ name: 'a' }, { name: 'b' }] }],
        columns: [
          {
            valueType: 'formList',
            dataIndex: 'members',
            columns: [
              {
                dataIndex: 'name',
                title: (
                  _schema: any,
                  _type: any,
                  _dom: any,
                  rowIndex?: number,
                ) => `成员${rowIndex}`,
              },
            ],
          },
        ],
      },
    ];

    const { getAllByText } = render(
      <BetaSchemaForm columns={columns as any} />,
    );
    expect(getAllByText('成员0')).toHaveLength(1);
    expect(getAllByText('成员1')).toHaveLength(1);
  });
});
