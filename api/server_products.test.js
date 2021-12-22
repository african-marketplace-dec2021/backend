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

describe("[1] describe endpoint /api/products", ()=>{
    test("[1-1-1] Happy, GET /api/products/ successfully", async ()=>{
        const response = await request(app).get("/api/products/");
        expect(response.body.length).toBe(5);
    })
    test("[1-2-1] Happy, GET /api/products/1 successfully", async ()=>{
        const response = await request(app).get("/api/products/1");
        expect(response.body.length).toBe(1);
    })
    test("[1-2-2] Sad, GET /api/products/1, fail due to non existing id", async ()=>{
        const response = await request(app).get("/api/products/10");
        expect(response.body.message).toMatch(/not found/);
    })
    test("[1-2-3] Sad, GET /api/products/10s, fail due to invalid id", async ()=>{
        const response = await request(app).get("/api/products/10s");
        expect(response.body.message).toMatch(/invalid id/);
    })
    test("[1-3-1] Happy, POST /api/products/, successfully created a new profile with middle_name", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":1, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("description");
        expect(response.body[0]).toHaveProperty("price");
        expect(response.body[0]).toHaveProperty("category_id");
        expect(response.body[0]).toHaveProperty("id");
    })
    test("[1-3-2] Sad, POST /api/products/, fail due to insufficient inputs", async ()=>{
        const newProduct = {"nam":"product 2", "descriptionn":"no description", "category_id":1, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        expect(response.body.message).toMatch(/require fields :/);
    })
    test("[1-3-3] Sad, POST /api/products/, fail due to invalid name", async ()=>{
        const newProduct = {"name":"", "description":"no description", "category_id":1, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        expect(response.body.message).toMatch(/name must/);
    })
    test("[1-3-4] Sad, POST /api/products/, fail due to invalid description", async ()=>{
        const newProduct = {"name":"product 1", "description":"", "category_id":1, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        expect(response.body.message).toMatch(/description must/);
    })
    test("[1-3-5] Sad, POST /api/products/, fail due to invalid price", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":1, "price":"12"};
        const response = await request(app).post("/api/products/").send(newProduct);
        expect(response.body.message).toMatch(/price must/);
    })
    test("[1-3-6] Sad, POST /api/products/, fail due to invalid category_id", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":"41", "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        expect(response.body.message).toMatch(/category_id must/);
        
    })
    test("[1-3-7] Sad, POST /api/products/, fail due to non existing category_id", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":400, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        expect(response.body.message).toMatch(/not found/);
        
    })
    test("[1-4-1] Happy, PUT /api/products/, successfully modify a product ", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/products/${id}`).send({"name":"product 1", "description":"no description", "category_id":4, "price":10.99});
        expect(response2.body.result).toBe(1);
    })
    test("[1-4-2] Sad, PUT /api/products/, fail due to invalid name", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/products/${id}`).send({"name":""});
        expect(response2.body.message).toMatch(/name must/);
    })
    test("[1-4-3] Sad, PUT /api/products/, fail due to invalid description", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/products/${id}`).send({"description":""});
        expect(response2.body.message).toMatch(/description must/);
    })
    test("[1-4-4] Sad, PUT /api/products/, fail due to invalid price", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/products/${id}`).send({"price":"10.99"});
        expect(response2.body.message).toMatch(/price must/);
    })
    test("[1-4-5] Sad, PUT /api/products/, fail due to invalid category_id", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/products/${id}`).send({"category_id":"400"});
        expect(response2.body.message).toMatch(/category_id must/);
    })
    test("[1-4-6] Sad, PUT /api/products/, fail due to non exsistence category_id", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/products/${id}`).send({"category_id":400});
        expect(response2.body.message).toMatch(/category_id 400 not found/);
    })

    test("[1-4-7] Sad, PUT /api/products/, fail due to no fields", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/products/${id}`).send();
        expect(response2.body.message).toMatch(/no valid column/);
    })
    test("[1-5-1] Happy, DELETE /api/products/, successfully delete a product", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).delete(`/api/products/${id}`);
        expect(response2.body.result).toBe(1);
    });
    test("[1-5-2] Sad, DELETE /api/products/, fail due to invalid id", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).delete(`/api/products/${id}zz`);
        expect(response2.body.message).toMatch(/invalid id/)
    })
    test("[1-5-3] Sad, DELETE /api/products/, fail due to non-existing id", async ()=>{
        const newProduct = {"name":"product 1", "description":"no description", "category_id":2, "price":10.99};
        const response = await request(app).post("/api/products/").send(newProduct);
        const id = response.body[0].id;
        const response2 = await request(app).delete(`/api/products/${id}11`);
        expect(response2.body.message).toMatch(/id 611 not found/)
    })
})