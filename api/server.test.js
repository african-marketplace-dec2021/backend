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

describe("[1] describe endpoint /api/users", ()=>{
    test("[1-1-1] Happy, GET /api/users/ successfully", async ()=>{
        const result = await request(app).get("/api/users/");

        expect(result.body.length).toBe(4);
    })
    test("[1-2-1] Happy, GET /api/users/1 successfully", async ()=>{
        const result = await request(app).get("/api/users/1");

        expect(result.body.length).toBe(1);
    })
    test("[1-2-2] Sad, GET /api/users/1 return not found message", async ()=>{
        const result = await request(app).get("/api/users/10");
        console.log("result = ", result);
        
        const actual = result.body.message;
        expect(actual).toMatch(/not found/);
    })
    test("[1-3-1] Happy, POST /api/users/, create a buyer successfully", async ()=>{
        /**
         * create a buyer
         */
        const newUser = { username: "happy", password:"happy", role:"buyer"};
        const response = await request(app).post("/api/users/").send(newUser);
        
        expect(response.body.length).toEqual(1);
        expect(response.body[0]).toHaveProperty("username");
        expect(response.body[0]).toHaveProperty("password");

        /**
         * create a seller
         */

        const newUser2 = { username: "happy2", password:"happy2", role:"seller"};
        const response2 = await request(app).post("/api/users/").send(newUser2);

        expect(response2.body.length).toEqual(1);
        expect(response2.body[0]).toHaveProperty("username");
        expect(response2.body[0]).toHaveProperty("password");
    })
    test("[1-3-2] Sad, POST /api/users/, result in an error", async ()=>{

        /**
         * cannot create a user - due to insufficient input
         */
        const newUser = { username: "happy", password:"happy"};
        const response = await request(app).post("/api/users/").send(newUser);
        
        expect(response.body.message).toMatch(/require username, password, and role/);
        
    })
})