import { createProField, FieldText } from '@ant-design/pro-components';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

const TextOnlyProField = createProField((text, _valueType, props) => (
  <FieldText {...props} text={String(text)} />
));

it('renders a scoped ProField built from public field exports', () => {
  render(<TextOnlyProField text="hello" valueType="text" />);
  expect(screen.getByText('hello')).toBeTruthy();
});
