const helper = require("./helper");

const varString = 'string';
const varEmptyString = "";
const varInteger = 15;
const varDecimal = 15.04;
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
    it('[5-1] - isEmptyArray return false for an array', () => {
        expect(helper.isEmptyArray(varArray)).toBe(false);
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

describe('[6] - describe verifyInterger', () => {
    it('[6-1] - verifyInterger return true for an integer ', () => {
        expect(helper.verifyInterger(varInteger)).toBe(true);
    })
    it('[6-2] - verifyInterger return true for number', () => {
        expect(helper.verifyInterger(varNumber)).toBe(true);
    })
    it('[6-3] - verifyInterger return false for an decimal', () => {
        expect(helper.verifyInterger(varDecimal)).toBe(false);
    })
    it('[6-4] - verifyInterger return false for an undefined object ', () => {
        expect(helper.verifyInterger(varUndefined)).toBe(false);
    })
    it('[6-5] - verifyInterger return false for a string ', () => {
        expect(helper.verifyInterger(varString)).toBe(false);
    })
    it('[6-6] - verifyInterger return false for an empty string ', () => {
        expect(helper.verifyInterger(varEmptyString)).toBe(false);
    })
    it('[6-7] - verifyInterger return false for an array', () => {
        expect(helper.verifyInterger(varArray)).toBe(false);
    })
    it('[6-8] - verifyInterger return false for an empty array', () => {
        expect(helper.verifyInterger(varEmptyArray)).toBe(false);
    })
    it('[6-9] - verifyInterger return false for object', () => {
        expect(helper.verifyInterger(varObj)).toBe(false);
    })
    
})

describe ('[7] - describe processBodyToObject', ()=>{
    it('[7-1] - processBodyToObject return all', ()=>{
        const keys = [
            {name:'name', type:'string'},
            {name:'price', type:'number'},
            {name:'quantity', type:'number'},
            {name:'boolean', type:'boolean'},
        ];

        const req_object = {'name': 'tom', 'price':15.12, 'quantity':10, 'boolean':false};

        const actual = helper.processBodyToObject(keys, req_object);
        const expected =  { name: 'tom', price: 15.12, quantity: 10, boolean: false };
        expect(actual).toMatchObject(expected);
    })

    it('[7-2] - processBodyToObject return partial', ()=>{
        const keys = [
            {name:'name', type:'string'},
            {name:'price', type:'number'},
        ];

        const req_object = {'name': 'tom', 'price':15.12, 'quantity':10, 'boolean':false};

        const actual = helper.processBodyToObject(keys, req_object);
        const expected =  { name: 'tom', price: 15.12};
        expect(actual).toMatchObject(expected);
    })

    it('[7-3] - processBodyToObject return partial', ()=>{
        const keys = [
            {name:'name', type:'string'},
            {name:'price', type:'number'},
        ];

        const req_object = {'name': 'tom', 'price':'15.12', 'quantity':10, 'boolean':false};

        const actual = helper.processBodyToObject(keys, req_object);
        const expected =  { name: 'tom'};
        expect(actual).toMatchObject(expected);
    })

    it('[7-4] - processBodyToObject return partial', ()=>{
        const keys = [
            {name:'name', type:'string'},
            {name:'price', type:'number'},
            {name:'quantity', type:'number'},
        ];

        const req_object = {'name': 'tom', 'price':15.12, 'quantity':10, 'boolean':false};

        const actual = helper.processBodyToObject(keys, req_object);
        const expected =  { name: 'tom', price: 15.12, quantity: 10, };
        expect(actual).toMatchObject(expected);
    })

    it('[7-5] - processBodyToObject return an empty object', ()=>{
        const keys = [
            {name:'name', type:'boolean'},
            {name:'price', type:'boolean'},
            {name:'quantity', type:'boolean'},
        ];

        const req_object = {'name': 'tom', 'price':15.12, 'quantity':10, 'boolean':false};

        const actual = helper.processBodyToObject(keys, req_object);
        const expected =  { };
        expect(actual).toMatchObject(expected);
    })

})

describe('[8] - describe verifyStringAndLength', () => {
    it('[8-1] - verifyStringAndLength return true for a string', () => {
        expect(helper.verifyStringAndLength(varString, 2, 100)).toBe(true);
    })
    it('[8-2] - verifyStringAndLength return false for an empty string', () => {
        expect(helper.verifyString(varEmptyString, 2, 100)).toBe(false);
    })
    it('[8-3] - verifyStringAndLength return false for an object', () => {
        expect(helper.verifyString(varObj, 2, 100)).toBe(false);
    })
    it('[8-4] - verifyStringAndLength return false for an undefined object', () => {
        expect(helper.verifyString(varUndefined, 2, 100)).toBe(false);
    })
    it('[8-5] - verifyStringAndLength return false for a number ', () => {
        expect(helper.verifyStringAndLength(varNumber, 2, 100)).toBe(false);
    })
    it('[8-6] - verifyStringAndLength return false for an array', () => {
        expect(helper.verifyStringAndLength(varArray, 2, 100)).toBe(false);
    })
    it('[8-7] - verifyStringAndLength return false for an empty array', () => {
        expect(helper.verifyStringAndLength(varEmptyArray, 2, 100)).toBe(false);
    })
})