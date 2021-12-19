const helper = require("./helper");

const varString = 'string';
const varEmptyString = "";
const varNumber = 15;
const varObj = { 'key': 'value' };
const varArray = ['key1', 'key2'];
const varEmptyArray = [];
let varUndefined;

describe('[1] - test isUndefined', () => {

    it('[1-1] - isUndefined return true for undefined variable', () => {
        expect(helper.isUndefined(varUndefined)).toBe(true);
    })
    it('[1-2] - isUndefined return false for a defined variable', () => {
        expect(helper.isUndefined(varString)).toBe(false);
    })
})

describe('[2] - describe isString function', () => {
    it('[2-1] - isString return true for a string', () => {
        expect(helper.isString(varString)).toBe(true);
    })
    it('[2-2] - isString return false for a number', () => {
        expect(helper.isString(varNumber)).toBe(false);
    })
    it('[2-3] - isString return false for an object', () => {
        expect(helper.isString(varObj)).toBe(false);
    })
    it('[2-4] - isString return false for an array', () => {
        expect(helper.isString(varArray)).toBe(false);
    })
})

describe('[3] - describe isEmptyString', () => {
    it('[3-1 - isEmptyString return true for an empty string', () => {
        expect(helper.isEmptyString(varEmptyString)).toBe(true);
    })
    it('[3-2 - isEmptyString return false for a string', () => {
        expect(helper.isEmptyString(varString)).toBe(false);
    })
    it('[3-3 - isEmptyString return false for a number', () => {
        expect(helper.isEmptyString(varNumber)).toBe(false);
    })
    it('[3-4 - isEmptyString return false for an object', () => {
        expect(helper.isEmptyString(varObj)).toBe(false);
    })
    it('[3-5 - isEmptyString return false for an undefined object', () => {
        expect(helper.isEmptyString(varUndefined)).toBe(false);
    })
    it('[3-6 - isEmptyString return false for an array', () => {
        expect(helper.isEmptyString(varArray)).toBe(false);
    })
    it('[3-7 - isEmptyString return false for an empty array', () => {
        expect(helper.isEmptyString(varEmptyArray)).toBe(false);
    })
})

describe('[4] - describe verifyString', () => {
    it('[4-1] - verifyString return true for a string', () => {
        expect(helper.verifyString(varString)).toBe(true);
    })
    it('[4-2] - verifyString return false for an empty string', () => {
        expect(helper.verifyString(varEmptyString)).toBe(false);
    })
    it('[4-3] - verifyString return false for an object', () => {
        expect(helper.verifyString(varObj)).toBe(false);
    })
    it('[4-4] - verifyString return false for an undefined object', () => {
        expect(helper.verifyString(varUndefined)).toBe(false);
    })
    it('[4-5] - verifyString return false for a number ', () => {
        expect(helper.verifyString(varNumber)).toBe(false);
    })
    it('[4-6] - verifyString return false for an array', () => {
        expect(helper.verifyString(varArray)).toBe(false);
    })
    it('[4-7] - verifyString return false for an empty array', () => {
        expect(helper.verifyString(varEmptyArray)).toBe(false);
    })
})

describe('[5] - describe isEmptyArray', () => {
    it('[5-1] - isEmptyArray return true for an empty array', () => {
        expect(helper.isEmptyArray(varEmptyArray)).toBe(true);
    })
    it('[5-2] - isEmptyArray return false for object', () => {
        expect(helper.isEmptyArray(varObj)).toBe(false);
    })
    it('[5-3] - isEmptyArray return false for an undefined object ', () => {
        expect(helper.isEmptyArray(varUndefined)).toBe(false);
    })
    it('[5-4] - isEmptyArray return false for number', () => {
        expect(helper.isEmptyArray(varNumber)).toBe(false);
    })
    it('[5-5] - isEmptyArray return false for a string ', () => {
        expect(helper.isEmptyArray(varString)).toBe(false);
    })
    it('[5-6] - isEmptyArray return false for an empty string ', () => {
        expect(helper.isEmptyArray(varEmptyString)).toBe(false);
    })
    it('[5-7] - isEmptyArray return false for an array', () => {
        expect(helper.isEmptyArray(varArray)).toBe(false);
    })
})