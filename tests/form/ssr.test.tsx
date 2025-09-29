// @vitest-environment node
import { DrawerForm, ModalForm, ProForm } from '@xxlabs/pro-components';
import { renderToString } from 'react-dom/server';
import { expect, test } from 'vitest';

test('ssr', () => {
  expect(renderToString(<ProForm />)).toBeDefined();
  expect(renderToString(<ModalForm />)).toBeDefined();
  expect(renderToString(<DrawerForm />)).toBeDefined();
});
