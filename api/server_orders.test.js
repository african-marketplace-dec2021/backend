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
        const newOrder = {"seller_user_id":1, "buyer_user_id":2 };
        const response = await request(app).post("/api/orders/").send(newOrder);
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("buyer_user_id")
        expect(response.body[0]).toHaveProperty("seller_user_id")

    })
    test("[1-3-2] Sad, POST /api/orders/, fail to create a new orders due to  insufficient fields", async ()=>{
        const newOrder = {};
        const response = await request(app).post("/api/orders/").send(newOrder);
        expect(response.body.message).toMatch(/require fields : /);
    })
    test("[1-3-3] Sad, POST /api/orders/, fail to create a new orders due to  invalid seller_user_id", async ()=>{
        const newOrder = {"seller_user_id":"1", "buyer_user_id":2 };
        const response = await request(app).post("/api/orders/").send(newOrder);
        expect(response.body.message).toMatch(/seller_user_id must be/);
    })
    test("[1-3-4] Sad, POST /api/orders/, fail to create a new orders due to  invalid buyer_user_id", async ()=>{
        const newOrder = {"seller_user_id":1, "buyer_user_id":"2" };
        const response = await request(app).post("/api/orders/").send(newOrder);
        expect(response.body.message).toMatch(/buyer_user_id must be/);
    })
    test("[1-3-5] Sad, POST /api/orders/, fail to create a new orders due to non existence seller_user_id", async ()=>{
        const newOrder = {"seller_user_id":10, "buyer_user_id":2 };
        const response = await request(app).post("/api/orders/").send(newOrder);
        expect(response.body.message).toMatch(/seller_user_id 10 not found/);
    })
    test("[1-3-6] Sad, POST /api/orders/, fail to create a new orders due to non existence buyer_user_id", async ()=>{
        const newOrder = {"seller_user_id":1, "buyer_user_id":20 };
        const response = await request(app).post("/api/orders/").send(newOrder);
        expect(response.body.message).toMatch(/buyer_user_id 20 not found/);
    })
    test("[1-3-7] Sad, POST /api/orders/, fail to create a new orders due to seller_user_id cannot equate to buyer_user_id", async ()=>{
        const newOrder = {"seller_user_id":1, "buyer_user_id":1 };
        const response = await request(app).post("/api/orders/").send(newOrder);
        expect(response.body.message).toMatch(/seller_user_id cannot equal to buyer_user_id/);
    })
})