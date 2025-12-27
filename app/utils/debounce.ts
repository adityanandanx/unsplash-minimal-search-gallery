/**
 * A type-safe debounce function.
 * @param func The function to debounce.
 * @param delay The delay in milliseconds.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>): void => {
    // if timer already exists, clear it
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // set a new timer
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
