// @vitest-environment node

import { DrawerForm, ModalForm, ProForm } from '@ant-design/pro-components';
import { renderToString } from 'react-dom/server';

test('ssr', () => {
  expect(renderToString(<ProForm />)).toBeDefined();
  expect(renderToString(<ModalForm />)).toBeDefined();
  expect(renderToString(<DrawerForm />)).toBeDefined();
});
