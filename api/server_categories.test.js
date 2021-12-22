const app = require("./server");
const request = require("supertest");
const db = require("../database/db-config");

beforeAll(async ()=>{
    await db.migrate.rollback();
    await db.migrate.latest();
})
beforeEach(async ()=>{
    await db.seed.run();
})

describe("sanity", ()=>{
    test("sanity", ()=>{
        expect(true).toBe(true);
    })
})

describe("[1] describe endpoint /api/categories", ()=>{
    test("[1-1-1] Happy, GET /api/categories/ successfully", async ()=>{
        const result = await request(app).get("/api/categories/");
        expect(result.body.length).toBe(5);
    })
    test("[1-2-1] Happy, GET /api/categories/1 successfully", async ()=>{
        const result = await request(app).get("/api/categories/1");

        expect(result.body.length).toBe(1);
    })
    test("[1-2-2] Sad, GET /api/categories/1, fail due to non existing id", async ()=>{
        const result = await request(app).get("/api/categories/10");
        console.log("result = ", result);
        
        const actual = result.body.message;
        expect(actual).toMatch(/not found/);
    })
    test("[1-2-3] Sad, GET /api/categories/10s, fail due to invalid id", async ()=>{
        const result = await request(app).get("/api/categories/10s");
        console.log("result = ", result);
        
        const actual = result.body.message;
        expect(actual).toMatch(/invalid id/);
    })
    test("[1-3-1] Happy, POST /api/categories/, successfully created a new profile with middle_name", async ()=>{

    })

})