const app = require("./server");
const request = require("supertest");
const db = require("../database/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

describe("sanity", () => {
  test("sanity", () => {
    expect(true).toBe(true);
  });
});

describe("[1] describe endpoint /api/products", () => {
  describe("[1-1] describe endpoint GET /api/products/", () => {
    test("[1-1-1] Happy, GET /api/products/ successfully", async () => {
      const response = await request(app).get("/api/products/");
      expect(response.body.length).toBe(5);
    });
  });

  describe("[1-2] describe endpoint GET /api/products/:id", () => {
    test("[1-2-1] Happy, GET /api/products/1 successfully", async () => {
      const response = await request(app).get("/api/products/1");
      expect(response.body.length).toBe(1);
    });
    test("[1-2-2] Sad, GET /api/products/1, fail due to non existing id", async () => {
      const response = await request(app).get("/api/products/10");
      expect(response.body.message).toMatch(/not found/);
    });
    test("[1-2-3] Sad, GET /api/products/10s, fail due to invalid id", async () => {
      const response = await request(app).get("/api/products/10s");
      expect(response.body.message).toMatch(/invalid id/);
    });
  });

  describe("[1-3] describe endpoint POST /api/products/", () => {
    test("[1-3-1] Happy, POST /api/products/, successfully created a new profile with middle_name", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 1,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);

      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("category_id");
      expect(response.body[0]).toHaveProperty("id");
    });
    test("[1-3-2] Happy, POST /api/products/, successfully created a new profile with middle_name", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 1,
        price: 11,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);

      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("category_id");
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("image_url");
      expect(response.body[0]).toHaveProperty("location");
    });
    test("[1-3-3] Happy, POST /api/products/, price as string integer", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 1,
        price: "12",
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("category_id");
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("image_url");
      expect(response.body[0]).toHaveProperty("location");
    });
    test("[1-3-4] Happy, POST /api/products/, price as string decimal", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 1,
        price: "12.99",
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);

      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("category_id");
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("image_url");
      expect(response.body[0]).toHaveProperty("location");
    });
    test("[1-3-5] Sad, POST /api/products/, fail due to missing fields ", async () => {
      const response1 = await request(app).post("/api/products/").send({
        description: "no description",
        category_id: 1,
        price: 10.99,
      });
      const response2 = await request(app).post("/api/products/").send({
        name: "sss",
        category_id: 1,
        price: 10.99,
      });
      const response3 = await request(app).post("/api/products/").send({
        name: "sss",
        description: "no description",
        price: 10.99,
      });
      const response4 = await request(app).post("/api/products/").send({
        name: "sss",
        description: "no description",
        category_id: 1,
      });
      expect(response1.body.message).toMatch(/require name/);
      expect(response2.body.message).toMatch(/require description/);
      expect(response3.body.message).toMatch(/require category_id/);
      expect(response4.body.message).toMatch(/require price/);
    });
    test("[1-3-6] Sad, POST /api/products/, fail due to invalid name", async () => {
      const newProduct = {
        name: "ss",
        description: "no description",
        category_id: 1,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      expect(response.body.message).toMatch(/name must/);
    });
    test("[1-3-7] Sad, POST /api/products/, fail due to invalid description", async () => {
      const newProduct = {
        name: "product 1",
        description: "ss",
        category_id: 1,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      expect(response.body.message).toMatch(/description must/);
    });

    test("[1-3-8] Happy, POST /api/products/, category_id as string", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: "2",
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);

      expect(response.body.length).toBe(1);
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("description");
      expect(response.body[0]).toHaveProperty("price");
      expect(response.body[0]).toHaveProperty("category_id");
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("image_url");
      expect(response.body[0]).toHaveProperty("location");
    });
    test("[1-3-9] Sad, POST /api/products/, fail due to non existing category_id", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 400,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      expect(response.body.message).toMatch(/not found/);
    });

    test("[1-3-10] Sad, POST /api/products/, fail due to category_id as string decimal", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: "10.50",
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      expect(response.body.message).toMatch(/category_id must/);
    });
  });

  describe("[1-4] describe endpoint PUT /api/products/:id", () => {
    test("[1-4-1] Happy, PUT /api/products/, successfully modify a product ", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 2,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      const id = response.body[0].id;
      const response2 = await request(app).put(`/api/products/${id}`).send({
        name: "product 1",
        description: "no description",
        category_id: 4,
        price: 10.99,
      });
      expect(response2.body.result).toBe(1);
    });
    test("[1-4-2] Sad, PUT /api/products/, fail due to invalid name", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 2,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      const id = response.body[0].id;
      const response2 = await request(app)
        .put(`/api/products/${id}`)
        .send({ name: "" });
      expect(response2.body.message).toMatch(/name must/);
    });
    test("[1-4-3] Sad, PUT /api/products/, fail due to invalid description", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 2,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      const id = response.body[0].id;
      const response2 = await request(app)
        .put(`/api/products/${id}`)
        .send({ description: "" });
      expect(response2.body.message).toMatch(/description must/);
    });
    test("[1-4-4] Sad, PUT /api/products/, fail due to non exsistence category_id", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 2,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      const id = response.body[0].id;
      const response2 = await request(app)
        .put(`/api/products/${id}`)
        .send({ category_id: 400 });
      expect(response2.body.message).toMatch(/category_id 400 not found/);
    });

    test("[1-4-5] Sad, PUT /api/products/, fail due to no fields", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 2,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      const id = response.body[0].id;
      const response2 = await request(app).put(`/api/products/${id}`).send();
      expect(response2.body.message).toMatch(/no valid column/);
    });
  });

  describe("[1-5] describe endpoint DELETE /api/products/:id", () => {
    test("[1-5-1] Happy, DELETE /api/products/, successfully delete a product", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 2,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      const id = response.body[0].id;
      const response2 = await request(app).delete(`/api/products/${id}`);
      expect(response2.body.result).toBe(1);
    });
    test("[1-5-2] Sad, DELETE /api/products/, fail due to invalid id", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 2,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      const id = response.body[0].id;
      const response2 = await request(app).delete(`/api/products/${id}zz`);
      expect(response2.body.message).toMatch(/invalid id/);
    });
    test("[1-5-3] Sad, DELETE /api/products/, fail due to non-existing id", async () => {
      const newProduct = {
        name: "product 1",
        description: "no description",
        category_id: 2,
        price: 10.99,
      };
      const response = await request(app)
        .post("/api/products/")
        .send(newProduct);
      const id = response.body[0].id;
      const response2 = await request(app).delete(`/api/products/${id}11`);
      expect(response2.body.message).toMatch(/id 611 not found/);
    });
  });
});
