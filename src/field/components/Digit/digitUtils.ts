import { isNil } from '../../../utils';

export function isEmptyOrWhitespace(str?: string): boolean {
  return isNil(str) || str === '' || str?.trim() === '';
}
