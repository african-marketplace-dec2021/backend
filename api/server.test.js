const app = require("./server");
const request = require("supertest");
const db = require("../database/db-config");

console.log("NODE_ENV = ", process.env.NODE_ENV);

beforeAll(async ()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
})

describe("sanity", ()=>{
    test("sanity", ()=>{
        expect(true).toBe(true);
    })
})

describe("describe endpoint /api/users", ()=>{
    test("GET /api/users/", async ()=>{
        const result = await request(app).get("/api/users/");
        console.log("result = ", result);
        
        const actual = result.body;
        const expected = 4;
        expect(actual.length).toBe(expected);
    })
    test("GET /api/users/", async ()=>{
        const result = await request(app).get("/api/users/1");
        console.log("result = ", result);
        
        const actual = result.body;
        const expected = 1;
        expect(actual.length).toBe(expected);
    })
    test("GET /api/users/", async ()=>{
        const result = await request(app).get("/api/users/10");
        console.log("result = ", result);
        
        const actual = result.body.message;
        const expected = 1;
        expect(actual).toMatch(/not found/);
    })
})