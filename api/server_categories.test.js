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
        const response = await request(app).get("/api/categories/");
        expect(response.body.length).toBe(5);
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("description");
    })
    test("[1-2-1] Happy, GET /api/categories/1 successfully", async ()=>{
        const response = await request(app).get("/api/categories/1");
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("description");
    })
    test("[1-2-2] Sad, GET /api/categories/1, fail due to non existing id", async ()=>{
        const response = await request(app).get("/api/categories/10");
        expect(response.body.message).toMatch(/not found/);
    })
    test("[1-2-3] Sad, GET /api/categories/10s, fail due to invalid id", async ()=>{
        const response = await request(app).get("/api/categories/10s");
        expect(response.body.message).toMatch(/invalid id/);
    })
    test("[1-3-1] Happy, POST /api/categories/, successfully created a new category", async ()=>{
        const newCategory = {"name":"other", "description":"no description"};
        const response = await request(app).post("/api/categories/").send(newCategory);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("description");
    })
    test("[1-3-2] Sad, POST /api/categories/, fail created a new category due to no fields", async ()=>{
        const newCategory = {"namee":"other", "descriptionn":"no description"};
        const response = await request(app).post("/api/categories/").send(newCategory);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toMatch(/require fields : /);
    })
    test("[1-3-3] Sad, POST /api/categories/, fail created a new category due to invalid name", async ()=>{
        const newCategory = {"name":"", "description":"no description"};
        const response = await request(app).post("/api/categories/").send(newCategory);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toMatch(/name must be/);
    })
    test("[1-4-1] Happy, PUT /api/categories/, successfully modify a category ", async ()=>{
        const newCategory = {"name":"cat 6", "description":"no description"};
        const response = await request(app).post("/api/categories/").send(newCategory);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/categories/${id}`).send({"name":"cat 6 modified"});

        expect(response.body.length).toBe(1);
        expect(response2.body).toHaveProperty("result");
        expect(response2.body.result).toBe(1);
    })
    test("[1-4-2] Sad, PUT /api/categories/, fail to modify a category due to invalid name", async ()=>{
        const newCategory = {"name":"cat 6", "description":"no description"};
        const response = await request(app).post("/api/categories/").send(newCategory);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/categories/${id}`).send({"name":""});

        expect(response.body.length).toBe(1);
        expect(response2.body).toHaveProperty("message");
        expect(response2.body.message).toMatch(/name must be/);
    })
    test("[1-4-3] Sad, PUT /api/categories/, fail to modify a category due to invalid description", async ()=>{
        const newCategory = {"name":"cat 6", "description":"no description"};
        const response = await request(app).post("/api/categories/").send(newCategory);
        const id = response.body[0].id;
        const response2 = await request(app).put(`/api/categories/${id}`).send({"description":""});

        expect(response.body.length).toBe(1);
        expect(response2.body).toHaveProperty("message");
        expect(response2.body.message).toMatch(/description must be/);
    })


})