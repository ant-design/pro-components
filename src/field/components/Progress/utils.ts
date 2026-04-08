export function getProgressStatus(
  text: number,
): 'success' | 'exception' | 'normal' | 'active' {
  if (text === 100) {
    return 'success';
  }
  if (text < 0) {
    return 'exception';
  }
  if (text < 100) {
    return 'active';
  }

  return 'normal';
}
