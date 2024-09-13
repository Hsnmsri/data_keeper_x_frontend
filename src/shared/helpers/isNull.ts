/**
 * Checks if the provided value is strictly equal to `null`.
 *
 * This function performs a strict equality check (`===`) to determine if the `value` is `null`.
 * It returns `true` if the value is `null` and `false` otherwise.
 *
 * @param value - The value to be checked.
 * @returns `true` if the value is `null`, otherwise `false`.
 *
 * @example
 * ```typescript
 * isNull(null); // returns true
 * isNull(undefined); // returns false
 * isNull(0); // returns false
 * ```
 */
export default function isNull(value: any) {
  return value === null;
}
