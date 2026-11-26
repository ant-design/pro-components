import type { GlobalToken } from 'antd';
import type { StyleCalc } from '../useStyle/calc';
import type { ProTokenType } from './layoutToken';

export type ProAliasToken = GlobalToken &
  ProTokenType & {
    /** Component tokens configured through antd ConfigProvider. */
    components?: Record<string, Record<string, unknown>>;
    themeId: number;
    /** Pro component class prefix, for example `.ant-pro`. */
    proComponentsCls: string;
    /** Ant Design component class prefix, for example `.ant`. */
    antCls: string;
    /** Ant Design icon class prefix. */
    iconCls: string;
    /** CSS-aware arithmetic, present only in antd cssVar mode. */
    calc?: StyleCalc;
  };
