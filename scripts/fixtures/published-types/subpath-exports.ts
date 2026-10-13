import { frFRIntl } from '@ant-design/pro-components/locale';
import type { ProColumns } from '@ant-design/pro-components/table/core';
import ProTable from '@ant-design/pro-components/table/core';
import { DragSortTable } from '@ant-design/pro-components/table/drag-sort';
import { EditableProTable } from '@ant-design/pro-components/table/editable';

type Row = { id: number };

const columns: ProColumns<Row>[] = [{ dataIndex: 'id' }];

export { columns, DragSortTable, EditableProTable, frFRIntl, ProTable };
