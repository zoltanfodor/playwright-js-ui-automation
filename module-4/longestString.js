'use strict';

/**
 * It recieves an array of strings and returns
 * the first longest string from it.
 * Also in the alphabetically first in case of more.
 *
 * @param {Array.<string>} strings
 * @returns {string} longest string or empty string in other cases
 */

function longestString(strings) {
    let longest = "";

    if (Array.isArray(strings) === false) {
        return longest;
    }

    strings.forEach(item => {
        if ((typeof item === "string") && (item.length >= longest.length)) {
            if (item.length === longest.length) {
                if (item < longest) {
                    longest = item;
                }
            } else {
                longest = item;
            }
        }
    });

    return longest;
}

module.exports = longestString;