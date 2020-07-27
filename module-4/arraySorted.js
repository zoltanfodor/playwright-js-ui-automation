'use strict';
/**
 * It determines, whether the given array is sorted in
 * alphabetically ascending order.
 * 
 * It ignores
 *  - case of the character
 *  - given special characters (nothing by default)
 *  - whitespaces
 * 
 * @param {Array.<string>} items the subject items
 * @param {string} ignore characters to ignore
 * @returns {boolean} true if the array is properly sorted,
 *                    false otherwise
 */
function arraySorted(array, ignore) {
    let reg = '';
    if (ignore) {
        let ignoreArray = ignore.split('');
        ignoreArray[0] = "^" + ignoreArray[0];
        for (let i = 1; i < ignoreArray.length; ++i) {
            ignoreArray[i] = "|^" + ignoreArray[i];
        }
        ignore = ignoreArray.join('');
        reg = new RegExp(`${ignore}`);
    }
    array = array.map(elements => elements.replace(reg, ''));
    array = array.map(elements => elements.toString().toLocaleLowerCase().split(' ').join(''));
    // array = array.map(elements => elements.split('').filter(element => element.replace(reg, '')).join(''));
    console.log(array);
    const original = [...array];
    array.sort();

    console.log(original);
    console.log(array);
    return JSON.stringify(original) === JSON.stringify(array);
}
module.exports = arraySorted;