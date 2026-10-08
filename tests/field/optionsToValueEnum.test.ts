import { expect, it } from 'vitest';
import { optionsToValueEnum } from '../../src/field/internal/optionsToValueEnum';

it('maps nested options with custom field names in traversal order', () => {
  const options = [
    {
      id: 1,
      name: 'parent',
      nodes: [{ id: 2, name: 'child', nodes: [] }],
    },
  ];

  const result = optionsToValueEnum(options, {
    value: 'id',
    label: 'name',
    children: 'nodes',
  });

  expect([...result]).toEqual([
    [1, 'parent'],
    [2, 'child'],
  ]);
  expect(options[0].nodes).toHaveLength(1);
});
