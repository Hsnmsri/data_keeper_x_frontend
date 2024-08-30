/**
 * Generates a random string of a specified length, with an optional inclusion of numbers.
 *
 * This function creates a random string using uppercase and lowercase letters. Optionally,
 * it can also include numeric digits if the `hasNumber` parameter is set to `true`.
 * The length of the generated string is determined by the `length` parameter.
 *
 * @param {number} length - The length of the random string to be generated.
 * @param {boolean} [hasNumber=false] - A boolean flag indicating whether the random string
 *                                      should include numbers. Defaults to `false`.
 * @returns {string} A random string of the specified length, containing letters,
 *                   and optionally numbers.
 *
 * @example
 * const randomString = randStr(10); // Generates a 10-character random string with letters only
 * console.log(randomString); // Example output: 'aBcDeFgHiJ'
 *
 * const randomStringWithNumbers = randStr(10, true); // Generates a 10-character random string with letters and numbers
 * console.log(randomStringWithNumbers); // Example output: 'aB3eD1gF7hI'
 */
export default function randStr(length: number, hasNumber = false) {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  // check has number contains
  if (hasNumber) {
    characters = `${characters}0123456789`;
  }

  let result = '';
  const charactersLength = characters.length;

  // generate random string
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
