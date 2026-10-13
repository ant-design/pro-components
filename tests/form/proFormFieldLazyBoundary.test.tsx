import { createProFormFieldLazyBoundary } from '../../src/form/components/FormItem/proFormFieldLazyBoundary';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('createProFormFieldLazyBoundary', () => {
  it('returns fallback when disabled', () => {
    const Boundary = createProFormFieldLazyBoundary(() =>
      Promise.resolve({
        default: () => <div data-testid="lazy-branch">loaded</div>,
      }),
    );

    render(
      <Boundary enabled={false} fallback={<div data-testid="fallback">fb</div>}>
        <span />
      </Boundary>,
    );

    expect(screen.getByTestId('fallback')).toBeTruthy();
    expect(screen.queryByTestId('lazy-branch')).toBeNull();
  });

  it('loads async branch when enabled', async () => {
    const Boundary = createProFormFieldLazyBoundary<{ marker: string }>(() =>
      Promise.resolve({
        default: ({ marker }) => <div data-testid="lazy-branch">{marker}</div>,
      }),
    );

    render(
      <Boundary
        enabled
        marker="ok"
        fallback={<div data-testid="fallback">fb</div>}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('lazy-branch').textContent).toBe('ok');
    });
  });
});
