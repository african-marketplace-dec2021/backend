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

describe("[1] describe endpoint /api/transactions", ()=>{
    test("[1-1-1] Happy, GET /api/transactions/ successfully", async ()=>{
        const response = await request(app).get("/api/transactions/");
        expect(response.body.length).toBe(5);
    })
    test("[1-2-1] Happy, GET /api/transactions/1 successfully", async ()=>{
        const response = await request(app).get("/api/transactions/1");
        expect(response.body.length).toBe(1);
    })
    test("[1-2-2] Sad, GET /api/transactions/1, fail due to non existing id", async ()=>{
        const response = await request(app).get("/api/transactions/10");
        expect(response.body.message).toMatch(/not found/);
    })
    test("[1-2-3] Sad, GET /api/transactions/10s, fail due to invalid id", async ()=>{
        const response = await request(app).get("/api/transactions/10s");
        expect(response.body.message).toMatch(/invalid id/);
    })
    test("[1-3-1] Happy, POST /api/transactions/, successfully created a new profile with middle_name", async ()=>{
        const newTransaction = {"order_id":1, "product_id":4, "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("order_id");
        expect(response.body[0]).toHaveProperty("product_id");
        expect(response.body[0]).toHaveProperty("quantity");
    })
    test("[1-3-] Sad, POST /api/transactions/, fail to create a transaction due to ", async ()=>{

    })
    test("[1-3-] Sad, POST /api/transactions/, fail to create a transaction due to ", async ()=>{

    })
    test("[1-3-] Sad, POST /api/transactions/, fail to create a transaction due to ", async ()=>{

    })
    test("[1-3-] Sad, POST /api/transactions/, fail to create a transaction due to ", async ()=>{

    })
    test("[1-3-] Sad, POST /api/transactions/, fail to create a transaction due to ", async ()=>{

    })
    test("[1-3-] Sad, POST /api/transactions/, fail to create a transaction due to ", async ()=>{

    })
    test("[1-3-] Sad, POST /api/transactions/, fail to create a transaction due to ", async ()=>{

    })

})