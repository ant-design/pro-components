import { act, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { loadableField } from '../../src/field/internal/loadableField';

it('shows a loading placeholder until a field chunk resolves', async () => {
  const Label = ({ text }: { text: string }) => <span>{text}</span>;
  let resolveModule!: (value: { default: typeof Label }) => void;
  const AsyncLabel = loadableField(
    () =>
      new Promise<{ default: typeof Label }>((resolve) => {
        resolveModule = resolve;
      }),
    (module) => module.default,
  );

  render(<AsyncLabel text="ready" />);
  expect(document.querySelector('[data-pro-field-loading]')).toBeTruthy();

  await act(async () => resolveModule({ default: Label }));
  expect(screen.getByText('ready')).toBeTruthy();
});

it('renders synchronously after preloading', async () => {
  const Label = ({ text }: { text: string }) => <span>{text}</span>;
  const AsyncLabel = loadableField(
    async () => ({ default: Label }),
    (module) => module.default,
  );
  await AsyncLabel.preload();

  render(<AsyncLabel text="preloaded" />);
  expect(screen.getByText('preloaded')).toBeTruthy();
  expect(document.querySelector('[data-pro-field-loading]')).toBeNull();
});
