/**
 * Checks if a given value is considered "empty".
 *
 * This function determines if the input value is an empty string (`''`).
 * It uses loose equality (`==`) to check, meaning that it will return `true`
 * for both `''` and `null`/`undefined` since these values are loosely equal to `''`.
 *
 * @param {any} value - The value to check for emptiness.
 * @returns {boolean} - Returns `true` if the value is an empty string, otherwise `false`.
 */
export default function isEmpty(value: any) {
  return value == '';
}
