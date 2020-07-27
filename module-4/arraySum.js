'use strict';

/**
 * It recieves an array of strings, integers and
 * array like itself.
 * Return the summary of all integers in it on * any level.
 *
 * @param {Array} elements
 * @returns {number} summary of all integers or 0 in other cases
 */
function arraySum(elementsArray) {
    let summary = 0;
    console.log("Length: " + elementsArray.length);
    if (!Array.isArray(elementsArray)) {
        return 0;
    }

    elementsArray.forEach(function (item) {
        if (typeof item === "number") {
            console.log("Item: " + item);
            summary += item;
        }
        if (Array.isArray(item)) {
            summary += arraySum(item);
        }
    });
    return summary;
}
module.exports = arraySum;