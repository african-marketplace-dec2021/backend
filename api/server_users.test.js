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

describe("[1] describe endpoint /api/users", ()=>{

    describe("[1-1] describe endpoint GET /api/users/", ()=>{
        test("[1-1-1] Happy, GET /api/users/ successfully", async ()=>{
            const result = await request(app).get("/api/users/");
            expect(result.body.length).toBe(4);
        })
    })

    describe("[1-2] describe endpoint GET /api/users/:id", ()=>{
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
    })

    describe("[1-3] describe endpoint POST /api/users/:id", ()=>{
        test("[1-3-1] Happy, POST /api/users/, successfully create a buyer", async ()=>{
            const newUser = { username: "happy", password:"happy", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            
            expect(response.body.length).toEqual(1);
            expect(response.body[0]).toHaveProperty("username");
            expect(response.body[0]).toHaveProperty("password");
        })
        test("[1-3-2] Happy, POST /api/users/, successfully create a seller", async ()=>{
            const newUser2 = { username: "happy2", password:"happy2", role:"seller"};
            const response2 = await request(app).post("/api/users/").send(newUser2);
    
            expect(response2.body.length).toEqual(1);
            expect(response2.body[0]).toHaveProperty("username");
            expect(response2.body[0]).toHaveProperty("password");
        })
        test("[1-3-3] Sad, POST /api/users/, cannot create a user - due to insufficient input", async ()=>{
            const newUser = { username: "happy", password:"happy"};
            const response = await request(app).post("/api/users/").send(newUser);
            
            expect(response.body.message).toMatch(/require username, password, and role/);
        })
        test("[1-3-4] Sad, POST /api/users/, cannot create a user - due to short username", async ()=>{ 
            const newUser = { username: "ha", password:"happy", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            
            expect(response.body.message).toMatch(/username and password must/);      
        })
        test("[1-3-5] Sad, POST /api/users/, cannot create a user - due to short password", async ()=>{ 
            const newUser = { username: "happy", password:"ha", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            
            expect(response.body.message).toMatch(/username and password must/);      
        })
        test("[1-3-6] Sad, POST /api/users/, cannot create a user - due to invalid role", async ()=>{ 
            const newUser = { username: "happy", password:"happy", role:"role"};
            const response = await request(app).post("/api/users/").send(newUser);
            
            expect(response.body.message).toMatch(/role must be /);      
        })
        test("[1-3-7] Sad, POST /api/users/, cannot create a user - due to unavailable username", async ()=>{ 
    
            const newUser = { username: "happy", password:"happy", role:"buyer"};
            await request(app).post("/api/users/").send(newUser);
            const response = await request(app).post("/api/users/").send(newUser);
            
            expect(response.body.message).toMatch(/username happy is not available/);      
        })
    })

    describe("[1-4] describe endpoint PUT /api/users/:id", ()=>{
        test("[1-4-1] Happy, PUT /api/users/, successfully change username", async ()=>{ 
            const newUser = { username: "jamjam", password:"jamjam", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            const response2 = await request(app).put(`/api/users/${response.body[0].id}`).send({username:"jamjamjam"})
            
            
            expect(response.body.length).toEqual(1);
            expect(response.body[0]).toHaveProperty("id");
            expect(response2.body.result).toEqual(1);      
        })
        test("[1-4-2] Happy, PUT /api/users/, successfully change password", async ()=>{ 
            const newUser = { username: "hamjam", password:"hamjam", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            const response2 = await request(app).put(`/api/users/${response.body[0].id}`).send({password:"hamhamjam"})
            
            
            expect(response.body.length).toEqual(1);
            expect(response.body[0]).toHaveProperty("id");
            expect(response2.body.result).toBe(1);      
        })
        test("[1-4-3] Sad, PUT /api/users/, fail due to no fields", async ()=>{ 
            const newUser = { username: "qamqam", password:"hamjam", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            const response2 = await request(app).put(`/api/users/${response.body[0].id}`).send({usernamee:"hamhamjam",passwordd:"hamhamjam"})
            
            
            expect(response.body.length).toEqual(1);
            expect(response.body[0]).toHaveProperty("id");
            expect(response2.body.message).toMatch(/no valid column name/);
        })
        test("[1-4-4] Happy, PUT /api/users/, successfully change password", async ()=>{ 
            await request(app).post("/api/users/").send({ username: "happy", password:"hamjam", role:"buyer"});
            const newUser = { username: "qammy", password:"hamjam", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            const response2 = await request(app).put(`/api/users/${response.body[0].id}`).send({username:"happy"})
            console.log("response2.body = ", response2);
            
            
            expect(response.body.length).toEqual(1);
            expect(response.body[0]).toHaveProperty("id");
            expect(response2.body.message).toMatch(/username happy is not available/);;      
        })
    })

    describe("[1-5] describe endpoint DELETE /api/users/:id", ()=>{
        test("[1-5-1] Happy, DELETE /api/users/, successfully delete a user", async ()=>{ 
            const newUser = { username: "jamjam", password:"jamjam", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            const response2 = await request(app).delete(`/api/users/${response.body[0].id}`);
            
            
            expect(response.body.length).toEqual(1);
            expect(response.body[0]).toHaveProperty("id");
            expect(response2.body.result).toEqual(1);      
        })
        test("[1-5-2] Sad, DELETE /api/users/, cannt delete a user due to invalid user id", async ()=>{ 
            const newUser = { username: "jamjam", password:"jamjam", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            const response2 = await request(app).delete(`/api/users/ss`);
            const response3 = await request(app).delete(`/api/users/3s`);
            
            
            expect(response.body.length).toEqual(1);
            expect(response.body[0]).toHaveProperty("id");
            expect(response2.body.message).toMatch(/invalid/);
            expect(response3.body).toHaveProperty("message");
            expect(response3.body.message).toMatch(/invalid id/);
        })
        test("[1-5-2] Sad, DELETE /api/users/, cannt delete a user due to non existing user id", async ()=>{ 
            const newUser = { username: "jamjam", password:"jamjam", role:"buyer"};
            const response = await request(app).post("/api/users/").send(newUser);
            const response2 = await request(app).delete(`/api/users/100`);
            
            
            expect(response.body.length).toEqual(1);
            expect(response.body[0]).toHaveProperty("id");
            expect(response2.body.message).toMatch(/id 100 not found/);
        })
    })    
})