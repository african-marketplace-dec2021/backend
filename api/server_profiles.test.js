const app = require("./server");
const request = require("supertest");
const db = require("../database/db-config");

console.log("NODE_ENV = ", process.env.NODE_ENV);

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

describe("[1] describe endpoint /api/profiles", ()=>{
    test("[1-1-1] Happy, GET /api/profiles/ successfully", async ()=>{
        const result = await request(app).get("/api/profiles/");
        expect(result.body.length).toBe(4);
    })
    test("[1-2-1] Happy, GET /api/profiles/1 successfully", async ()=>{
        const result = await request(app).get("/api/profiles/1");

        expect(result.body.length).toBe(1);
    })
    test("[1-2-2] Sad, GET /api/profiles/1, fail due to non existing id", async ()=>{
        const result = await request(app).get("/api/profiles/10");
        console.log("result = ", result);
        
        const actual = result.body.message;
        expect(actual).toMatch(/not found/);
    })
    test("[1-2-3] Sad, GET /api/profiles/10s, fail due to invalid id", async ()=>{
        const result = await request(app).get("/api/profiles/10s");
        console.log("result = ", result);
        
        const actual = result.body.message;
        expect(actual).toMatch(/invalid id/);
    })

    test("[1-3-1] Happy, POST /api/profiles/, successfully created a new profile", async ()=>{
        const newProfile = {"first_name":"tommy", "last_name":"tommy", "middle_name":"tommy", "email":"tommy@mail.com", "user_id":1};
        const response = await request(app).post("/api/profiles/").send(newProfile);
        
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("first_name");
        expect(response.body[0]).toHaveProperty("last_name");
        expect(response.body[0]).toHaveProperty("email");
        expect(response.body[0]).toHaveProperty("user_id");
        expect(response.body[0]).toHaveProperty("id");
    })
    test("[1-3-2] Sad, POST /api/profiles/, fail to create a profile due to insufficient input", async ()=>{
        const newProfile = {"first_name":"tommy", "last_name":"tommy", "middle_name":"tommy", "email":"tommy@mail.com"};
        const response = await request(app).post("/api/profiles/").send(newProfile);
        
        expect(response.body.message).toMatch(/require fields: first_name, last_name, email, user_id. Optional fields : middle_name/);
    })
})