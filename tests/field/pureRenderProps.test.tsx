import { expect, it } from 'vitest';
import {
  defaultRenderEdit,
  defaultRenderRead,
} from '../../src/field/AllProField';

it.each([defaultRenderRead, defaultRenderEdit])(
  'does not mutate caller props when rendering ProField',
  (render) => {
    const props = Object.freeze({ emptyText: 'empty', mode: 'read' as const });

    expect(() => render('value', 'text', props, {})).not.toThrow();
    expect(props.emptyText).toBe('empty');
  },
);
