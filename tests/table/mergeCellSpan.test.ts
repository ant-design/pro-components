import { describe, expect, it } from 'vitest';
import {
  calcRowSpanMap,
  normalizeMergeFieldKey,
  resolveMergeFieldDescriptors,
  wrapColumnsWithRowSpan,
} from '../../src/table/utils/mergeCellSpan';

type Row = { city?: string | null; area?: string | null; name?: string };

const cityField = {
  key: 'city',
  getValue: (record: Row) => record.city,
};

const areaField = {
  key: 'area',
  getValue: (record: Row) => record.area,
};

describe('calcRowSpanMap', () => {
  it('连续同值合并：组首行 rowSpan 为组长度，组内后续行为 0', () => {
    const rows: Row[] = [
      { city: '上海', name: '张三' },
      { city: '上海', name: '李四' },
      { city: '北京', name: '王五' },
    ];
    const spanMap = calcRowSpanMap(rows, [cityField]);
    const citySpans = spanMap.get('city')!;
    expect(citySpans.get(rows[0])).toBe(2);
    expect(citySpans.get(rows[1])).toBe(0);
    expect(citySpans.get(rows[2])).toBe(1);
  });

  it('仅合并连续相同值，非连续同值不合并', () => {
    const rows: Row[] = [{ city: '上海' }, { city: '北京' }, { city: '上海' }];
    const spanMap = calcRowSpanMap(rows, [cityField]);
    const citySpans = spanMap.get('city')!;
    expect(citySpans.get(rows[0])).toBe(1);
    expect(citySpans.get(rows[1])).toBe(1);
    expect(citySpans.get(rows[2])).toBe(1);
  });

  it('多级依次合并：子级字段不跨父级组合并', () => {
    const rows: Row[] = [
      { city: '上海', area: '浦东' },
      { city: '上海', area: '浦东' },
      { city: '北京', area: '浦东' },
      { city: '北京', area: '海淀' },
    ];
    const spanMap = calcRowSpanMap(rows, [cityField, areaField]);
    const areaSpans = spanMap.get('area')!;
    // area 值连续相同（浦东x3），但第三个浦东属于北京组，不允许跨组合并
    expect(areaSpans.get(rows[0])).toBe(2);
    expect(areaSpans.get(rows[1])).toBe(0);
    expect(areaSpans.get(rows[2])).toBe(1);
    expect(areaSpans.get(rows[3])).toBe(1);
  });

  it('空数据返回空映射', () => {
    const spanMap = calcRowSpanMap<Row>([], [cityField]);
    expect(spanMap.get('city')!.size).toBe(0);
  });

  it('null / undefined 等空值参与合并', () => {
    const rows: Row[] = [{ city: null }, { city: null }, { city: undefined }];
    const spanMap = calcRowSpanMap(rows, [cityField]);
    const citySpans = spanMap.get('city')!;
    expect(citySpans.get(rows[0])).toBe(2);
    expect(citySpans.get(rows[1])).toBe(0);
    // null 与 undefined 不相等，第三行自成一组
    expect(citySpans.get(rows[2])).toBe(1);
  });

  it('单行数据时每个字段都返回 span=1', () => {
    const rows: Row[] = [{ city: '上海' }];
    const spanMap = calcRowSpanMap(rows, [cityField, areaField]);
    expect(spanMap.has('area')).toBe(true);
    expect(spanMap.get('area')!.get(rows[0])).toBe(1);
  });

  it('isRowMergeBoundary 断开行：自身不并入任何组，且打断前后组合并', () => {
    const rows: Row[] = [
      { city: '上海' },
      { city: '上海' },
      { city: '上海' },
      { city: '上海' },
    ];
    // 第 2 行（下标 1）为边界行（如编辑中的行）
    const spanMap = calcRowSpanMap(
      rows,
      [cityField],
      (_record, index) => index === 1,
    );
    const citySpans = spanMap.get('city')!;
    // 行 0：组被边界行打断，span=1
    expect(citySpans.get(rows[0])).toBe(1);
    // 行 1：边界行自身不并入任何组
    expect(citySpans.get(rows[1])).toBe(1);
    // 行 2-3：边界之后重新成组，正常合并
    expect(citySpans.get(rows[2])).toBe(2);
    expect(citySpans.get(rows[3])).toBe(0);
  });
});

describe('normalizeMergeFieldKey', () => {
  it('字符串 dataIndex 原样返回，数组 dataIndex 以点号连接', () => {
    expect(normalizeMergeFieldKey('city')).toBe('city');
    expect(normalizeMergeFieldKey(['a', 'b'])).toBe('a.b');
    expect(normalizeMergeFieldKey(undefined)).toBe(undefined);
  });
});

describe('resolveMergeFieldDescriptors', () => {
  it('mergeFields 顺序优先，autoMerge 列按列顺序补充并去重', () => {
    const columns: any[] = [
      { title: '城市', dataIndex: 'city', autoMerge: true },
      { title: '姓名', dataIndex: 'name' },
      { title: '区域', dataIndex: 'area', autoMerge: true },
    ];
    const descriptors = resolveMergeFieldDescriptors(columns, ['area']);
    expect(descriptors.map((item) => item.key)).toEqual(['area', 'city']);
  });

  it('未配置 mergeFields 时仅收集 autoMerge 列，分组表头递归拍平', () => {
    const columns: any[] = [
      { title: '城市', dataIndex: 'city', autoMerge: true },
      {
        title: '分组',
        children: [
          { title: '区域', dataIndex: ['addr', 'area'], autoMerge: true },
        ],
      },
    ];
    const descriptors = resolveMergeFieldDescriptors(columns, undefined);
    expect(descriptors.map((item) => item.key)).toEqual(['city', 'addr.area']);
    const record = { city: '上海', addr: { area: '浦东' } };
    expect(descriptors[1].getValue(record)).toBe('浦东');
  });

  it('mergeFields 指定但无对应列时回退为字段路径取值', () => {
    const descriptors = resolveMergeFieldDescriptors([], ['a.b']);
    expect(descriptors[0].getValue({ a: { b: 1 } })).toBe(1);
  });
});

describe('wrapColumnsWithRowSpan', () => {
  const rows = [{ city: '上海' }, { city: '上海' }, { city: '北京' }];
  const spanMap = calcRowSpanMap(rows, [cityField]);

  it('命中合并字段的列注入计算出的 rowSpan', () => {
    const columns: any[] = [{ title: '城市', dataIndex: 'city' }];
    const [wrapped] = wrapColumnsWithRowSpan(columns, spanMap);
    expect(wrapped.onCell!(rows[0], 0)).toMatchObject({ rowSpan: 2 });
    expect(wrapped.onCell!(rows[1], 1)).toMatchObject({ rowSpan: 0 });
    expect(wrapped.onCell!(rows[2], 2)).toMatchObject({ rowSpan: 1 });
  });

  it('用户 onCell 显式返回 rowSpan 时优先于自动合并', () => {
    const columns: any[] = [
      {
        title: '城市',
        dataIndex: 'city',
        onCell: (record: any) => ({
          rowSpan: record.city === '北京' ? 5 : undefined,
        }),
      },
    ];
    const [wrapped] = wrapColumnsWithRowSpan(columns, spanMap);
    // 北京行：用户显式 rowSpan=5，覆盖自动合并的 1
    expect(wrapped.onCell!(rows[2], 2)).toMatchObject({ rowSpan: 5 });
    // 上海首行：用户未给 rowSpan，注入自动合并的 2
    expect(wrapped.onCell!(rows[0], 0)).toMatchObject({ rowSpan: 2 });
  });

  it('用户 onCell 的其他单元格属性保留', () => {
    const columns: any[] = [
      {
        title: '城市',
        dataIndex: 'city',
        onCell: () => ({ className: 'custom-cell' }),
      },
    ];
    const [wrapped] = wrapColumnsWithRowSpan(columns, spanMap);
    expect(wrapped.onCell!(rows[0], 0)).toMatchObject({
      className: 'custom-cell',
      rowSpan: 2,
    });
  });

  it('未命中合并字段的列保持原引用', () => {
    const columns: any[] = [
      { title: '城市', dataIndex: 'city' },
      { title: '姓名', dataIndex: 'name' },
    ];
    const wrapped = wrapColumnsWithRowSpan(columns, spanMap);
    expect(wrapped[1]).toBe(columns[1]);
    expect(wrapped[0]).not.toBe(columns[0]);
  });

  it('spanMap 之外的记录（如树形子行）默认 rowSpan 为 1', () => {
    const columns: any[] = [{ title: '城市', dataIndex: 'city' }];
    const [wrapped] = wrapColumnsWithRowSpan(columns, spanMap);
    const orphanRow = { city: '上海' };
    expect(wrapped.onCell!(orphanRow as any, 0)).toMatchObject({ rowSpan: 1 });
  });
});
