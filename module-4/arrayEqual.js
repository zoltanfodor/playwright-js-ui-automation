'use strict';

/**
 * It determines, whether the given two arrays
 * are equal, by considering the number of elements,
 * those order and value, in all levels.
 *
 * It prints out a message in case of any
 * difference in any array, using console.warn!
 *
 * @param {Array} first The first array
 * @param {Array} second The second array
 * @returns {boolean} true if the two arrays are equal,
 *                    false otherwise
 */

function arrayEqual(first, second) {

    if (first.length !== second.length) {
        console.warn('The first array length: ' + first.length + ' differs from the second: ' + second.length);
        return false;
    }

    for (let i = 0; i < first.length; ++i) {
        if (Array.isArray(first[i]) && Array.isArray(second[i])) {
            if (!arrayEqual(first[i], second[i])) {
                return false;
            }
        }
        else if (first[i] !== second[i]) {
            console.warn('The first array element: ' + first[i] + ' differs from the second: ' + second[i]);
            return false;
        }
    }
    return true;
}

module.exports = arrayEqual;