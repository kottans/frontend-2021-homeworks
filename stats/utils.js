function mergeObjects(primaryObject, secondaryObject) {
  const mergedObject = {...primaryObject};
  Object.keys(secondaryObject)
    .forEach(key => {
      mergedObject[key] = {
        ...secondaryObject[key],
        ...primaryObject[key],
      };
    });
  return mergedObject;
}

/**
 * Recombines elements from input arrays into an array of tuples
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns {[*,*][]}
 */
function recombine(arr1, arr2) {
  return arr1.reduce((acc, e1) => [...acc, ...arr2.map(e2 => [e1, e2])], []);
}

module.exports = {
  mergeObjects,
  recombine,
};
