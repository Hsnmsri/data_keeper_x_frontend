/**
 * Searches for a specific text within an array of objects.
 *
 * This function iterates through each object in the provided `data` array and checks
 * if any of the string values within the object contain the specified `searchText`.
 * The search is case-insensitive. If a match is found in any of the values of an object,
 * that entire object is included in the result.
 *
 * @param {any[]} data - An array of objects where each object contains multiple fields
 *                       with string values to be searched.
 * @param {string | null} searchText - The text to search for within the objects.
 *                                     If this parameter is null, empty, or consists
 *                                     only of spaces, the function returns null.
 * @returns {any[] | null} - Returns an array of objects where at least one string value
 *                           contains the search text. If no matches are found, or if
 *                           the `searchText` is invalid, returns null.
 *
 * @example
 * const data = [
 *   { id: 1, name: "Alice", email: "alice@example.com" },
 *   { id: 2, name: "Bob", email: "bob@example.com" },
 *   { id: 3, name: "Charlie", email: "charlie@example.com" }
 * ];
 *
 * const result = searchOnArray(data, "bob");
 * console.log(result); // Output: [{ id: 2, name: "Bob", email: "bob@example.com" }]
 */
export default function searchOnArray(
  data: any,
  searchText: string | null
): any[] | null {
  if (!searchText || searchText.trim() === '') {
    return null;
  }

  const lowerCaseSearchText = searchText.toLowerCase();

  const result = data.filter((dataRecord: any) => {
    return Object.keys(dataRecord).some((key) => {
      const value = dataRecord[key];
      return (
        typeof value === 'string' &&
        value.toLowerCase().includes(lowerCaseSearchText)
      );
    });
  });

  return result.length > 0 ? result : null;
}
