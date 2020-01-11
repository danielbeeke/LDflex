/**
 * Converts an asynchronously iterable path into an array.
 *
 * Requires:
 * - (optional) an iterable path
 */
export default class ToArrayHandler {
  handle(pathData, path) {
    return async map => {
      const items = [];
      // Verify the path is async iterable
      if (path && (typeof path[Symbol.asyncIterator] === 'function')) {
        // Ensure the mapping function is valid
        if (typeof map !== 'function')
          map = item => item;
        // Retrieve and map all elements
        let index = 0;
        for await (const item of path)
          items.push(await map(item, index++));
      }
      return items;
    };
  }
}
