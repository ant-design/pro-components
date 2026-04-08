import type { ProFieldFCMode } from '../../provider';

/**
 * Shared mode checks for Field* components (read vs edit branches).
 * Keep semantics aligned with existing code: some components only treat `edit`
 * as interactive (not `update`); do not collapse those into edit-or-update.
 *
 * Light-filter UI (`light` / `isLight`) is separate: use `wrapProFieldLight` in
 * `./ProFieldLightWrapper`, not these helpers.
 */
export function isProFieldReadMode(mode: ProFieldFCMode | undefined): boolean {
  return mode === 'read';
}

/** `edit` or `update` — most Field* interactive branches. */
export function isProFieldEditOrUpdateMode(
  mode: ProFieldFCMode | undefined,
): boolean {
  return mode === 'edit' || mode === 'update';
}

/** Strict `edit` only — used where `update` previously fell through (e.g. Radio). */
export function isProFieldEditOnlyMode(
  mode: ProFieldFCMode | undefined,
): boolean {
  return mode === 'edit';
}
