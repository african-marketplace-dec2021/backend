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
    test("[1-3-2] Sad, POST /api/transactions/, fail to create a transaction due to insufficient inputs", async ()=>{
        const newTransaction = {"order_id":1, "product_id":4};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        expect(response.body.message).toMatch(/require fields : /);
    })
    test("[1-3-3] Sad, POST /api/transactions/, fail to create a transaction due to invalid order_id", async ()=>{
        const newTransaction = {"order_id":"1", "product_id":4, "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        const newTransaction2 = {"order_id":"1", "product_id":4, "quantity":10};
        const response2 = await request(app).post("/api/transactions").send(newTransaction2);
        expect(response.body.message).toMatch(/order_id must/);
        expect(response2.body.message).toMatch(/order_id must/);
    })
    test("[1-3-4] Sad, POST /api/transactions/, fail to create a transaction due to invalid product_id", async ()=>{
        const newTransaction = {"order_id":1, "product_id":"4", "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        const newTransaction2 = {"order_id":1, "product_id":"4", "quantity":10};
        const response2 = await request(app).post("/api/transactions").send(newTransaction2);
        expect(response.body.message).toMatch(/product_id must/);
        expect(response2.body.message).toMatch(/product_id must/);
    })
    test("[1-3-5] Sad, POST /api/transactions/, fail to create a transaction due to invalid quantity", async ()=>{   
        const newTransaction = {"order_id":1, "product_id":4, "quantity":"10"};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        const newTransaction2 = {"order_id":1, "product_id":4, "quantity":-10};
        const response2 = await request(app).post("/api/transactions").send(newTransaction2);
        expect(response.body.message).toMatch(/quantity must/);
        expect(response2.body.message).toMatch(/quantity must/);
    })
    test("[1-3-6] Sad, POST /api/transactions/, fail to create a transaction due to non-existence order_id", async ()=>{
        const newTransaction = {"order_id":100, "product_id":4, "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        expect(response.body.message).toMatch(/order_id 100 not found/);
    })
    test("[1-3-7] Sad, POST /api/transactions/, fail to create a transaction due to non-existence product_id", async ()=>{
        const newTransaction = {"order_id":1, "product_id":400, "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        expect(response.body.message).toMatch(/product_id 400 not found/);
    })
    
    test("[1-4-1] Happy, PUT /api/transactions/, successfully modify a transaction", async ()=>{
        const newTransaction = {"order_id":1, "product_id":4, "quantity":10};
        const response = await request(app).post("/api/transactions/").send(newTransaction);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/transactions/${id}`).send(newTransaction);
        expect(response.body[0]).toHaveProperty("id");
        expect(response2.body).toHaveProperty("result");
    })
    test("[1-4-2] Sad, PUT /api/transactions/, fail to modify a transaction due to no inputs", async ()=>{
        const response2 = await request(app).put(`/api/transactions/5`).send({});
        expect(response2.body.message).toMatch(/no valid column/);
    })
    test("[1-4-3] Sad, PUT /api/transactions/, fail to modify a transaction due to invalid order_id", async ()=>{
        const newTransaction = {"order_id":1, "product_id":4, "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/transactions/${id}`).send({"order_id":"10"});
        const response3 = await request(app).put(`/api/transactions/${id}`).send({"order_id":-10});
        expect(response2.body.message).toMatch(/order_id must/);
        expect(response3.body.message).toMatch(/order_id must/);
    })
    test("[1-4-4] Sad, PUT /api/transactions/, fail to modify a transaction due to invalid product_id", async ()=>{
        const newTransaction = {"order_id":1, "product_id":4, "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/transactions/${id}`).send({"product_id":"10"});
        const response3 = await request(app).put(`/api/transactions/${id}`).send({"product_id":-10});
        expect(response2.body.message).toMatch(/product_id must/);
        expect(response3.body.message).toMatch(/product_id must/);
    })
    test("[1-4-5] Sad, PUT /api/transactions/, fail to modify a transaction due to invalid quantity", async ()=>{
        const newTransaction = {"order_id":1, "product_id":4, "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/transactions/${id}`).send({"quantity":"10"});
        const response3 = await request(app).put(`/api/transactions/${id}`).send({"quantity":-10});
        expect(response2.body.message).toMatch(/quantity must/);
        expect(response3.body.message).toMatch(/quantity must/);
    })
    test("[1-4-6] Sad, PUT /api/transactions/, fail to modify a transaction due to non existence order_id", async ()=>{
        const response2 = await request(app).put(`/api/transactions/1`).send({"order_id":100});
        expect(response2.body.message).toMatch(/order_id 100 not found/);
    })
    test("[1-4-7] Sad, PUT /api/transactions/, fail to modify a transaction due to non existence product_id", async ()=>{
        const response2 = await request(app).put(`/api/transactions/1`).send({"product_id":100});
        expect(response2.body.message).toMatch(/product_id 100 not found/);
    })

    test("[1-5-1] Happy, DELETE /api/transactions/, successfully delete a transaction", async ()=>{
        const newTransaction = {"order_id":1, "product_id":4, "quantity":10};
        const response = await request(app).post("/api/transactions").send(newTransaction);
        const id = response.body[0].id;
        const response2 = await request(app).delete(`/api/transactions/${id}`);
        expect(response2.body.result).toBe(1);
    })
    test("[1-5-2] Sad, PUT /api/transactions/, fail to delete a transaction due to invalid id", async ()=>{
        const response = await request(app).delete(`/api/transactions/100zz`);
        const response2 = await request(app).delete(`/api/transactions/-100`);
        expect(response.body.message).toMatch(/id must be/);
        expect(response2.body.message).toMatch(/id must be/);
    })
    test("[1-5-3] Sad, PUT /api/transactions/, fail to delete a transaction due to non-existence id", async ()=>{
        const response = await request(app).delete(`/api/transactions/100`);
        expect(response.body.message).toMatch(/id 100 not found/);
    })
})