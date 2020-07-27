'use strict';
/**
 * It returns the camel-case version of string.
 * E.g.: simple lowercase string => SimpleLowercaseString
 *
 * @param {string} toConvert
 * @returns {string} camel-case string or empty string in other cases
 */

function toCamelCase (toConvert) {
    const regex = /(\w|\d)/;

    if (typeof toConvert !== "string") {
        return "";
    }
    const stringArray = toConvert.split(" ");
    const withoutSpec = stringArray.map(element => {
       return element.split("").filter(char => {
           return char.match(regex);
       }).join("");
    });
    const filtered = withoutSpec.filter(element => element !== "");
    const converted = filtered.map((element, i) => {
        if (!i) {
            return element.toLowerCase();
        }
        return element[0].toUpperCase() + element.slice(1).toLowerCase();
    });

    return converted.join("");
}

module.exports = toCamelCase;