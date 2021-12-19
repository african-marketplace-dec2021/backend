function isUndefined(input) {
    return typeof input === 'undefined';
}

function isString(input) {
    return typeof input === 'string';
}

function isEmptyString(input) {
    return isString(input) && input.trim() === "";
}

function verifyString(input) {
    return !isUndefined(input) && isString(input) && !isEmptyString(input);
}

function isEmptyArray(input) {
    return Array.isArray(input) && input.length === 0;
}
module.exports = { isUndefined, isString, isEmptyString, verifyString, isEmptyArray };