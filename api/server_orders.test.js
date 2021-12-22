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

describe("[1] describe endpoint /api/orders", ()=>{
    test("[1-1-1] Happy, GET /api/orders/ successfully", async ()=>{
        const response = await request(app).get("/api/orders/");
        expect(response.body.length).toBe(1);
    })
    test("[1-2-1] Happy, GET /api/orders/1 successfully", async ()=>{
        const response = await request(app).get("/api/orders/1");
        expect(response.body.length).toBe(1);
    })
    test("[1-2-2] Sad, GET /api/orders/1, fail due to non existing id", async ()=>{
        const response = await request(app).get("/api/orders/10");
        expect(response.body.message).toMatch(/not found/);
    })
    test("[1-2-3] Sad, GET /api/orders/10s, fail due to invalid id", async ()=>{
        const response = await request(app).get("/api/orders/10s");
        expect(response.body.message).toMatch(/invalid id/);
    })
    test("[1-3-1] Happy, POST /api/orders/, successfully created a new profile with middle_name", async ()=>{

    })
})