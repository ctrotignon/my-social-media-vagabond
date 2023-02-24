const { app, connection } = require("../app");
const request = require("supertest");
const { response } = require("../app");
const mysql = require("promise-mysql");
const { addPost, getPosts } = require("../routes/posts_routes");


beforeAll(async () => {
  await connection.then((dataBase) => {
    getPosts(app,dataBase)
    addPost(app, dataBase);
  });
});

describe("test the routes path of posts_routes", () => {
  it("Should respond to the GET method", async () => {
    await request(app)
      .get("/getPosts")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  }),
    it("Should add a post", async () => {
      await request(app)
        .post("/addPost")
        .send({ id: 2, content: "wesh" })
        .then((response) => {
          expect(response.statusCode).toEqual(200);
        });
    }),
    it("Should throw an error if an attribute missing into the body", async () => {
      await request(app)
        .post("/addPost")
        .send({ id: 2 })
        .then((response) => {
          expect(response.statusCode).toEqual(500);
        });
    }),
    it("Should throw an error if the body is incorrect", async () => {
      await request(app)
        .post("/addPost")
        .send({ id: 2, content: "test", vdsljknvdasdav: "test2" })
        .then((response) => {
          expect(response.statusCode).toEqual(500);
        });
    });

    // it("Should throw an error",async ()=> {

    // })
});
