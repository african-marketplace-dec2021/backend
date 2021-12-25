function isUndefined(input) {
  return typeof input === "undefined" || input === null;
}

function isString(input) {
  return typeof input === "string";
}

function verifyInterger(input) {
  let regex = /^[-+]?[0-9]+\.[0-9]+$/;
  return Number.isInteger(input) && regex.test(input) === false && input > 0;
}

/**
 * verify an integer , return true
 * verify a decimal, return true
 * return false on any other type
 * @param {*} input
 * @returns
 */
function verifyDecimal(input) {
  let regex = /^[-+]?[0-9]+\.[0-9]+$/;
  if (typeof input === "string") {
    return false;
  } else {
    return (
      Number.isInteger(input) || regex.test(input) || typeof input === "Number"
    );
  }
}

function isEmptyString(input) {
  return isString(input) && input.trim() === "";
}

function verifyString(input) {
  return !isUndefined(input) && isString(input) && !isEmptyString(input);
}
function verifyStringAndLength(input, min, max) {
  return (
    !isUndefined(input) &&
    isString(input) &&
    !isEmptyString(input) &&
    input.length >= min &&
    input.length <= max
  );
}

function isEmptyArray(input) {
  return Array.isArray(input) && input.length === 0;
}

function processBodyToObject(keys, req_object) {
  const obj = {};
  keys.forEach((element) => {
    if (
      req_object.hasOwnProperty(element.name) &&
      typeof req_object[element.name] === element.type
    ) {
      obj[element.name] = req_object[element.name];
    }
  });
  return obj;
}

module.exports = {
  isUndefined,
  isString,
  isEmptyString,
  verifyString,
  isEmptyArray,
  verifyInterger,
  processBodyToObject,
  verifyStringAndLength,
  verifyDecimal,
};
