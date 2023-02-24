const {app, connection} = require("../app");
const request = require("supertest");
const { response } = require("../app");
const { beforeEach } = require("node:test");
const mysql = require("promise-mysql");
const { getAllUsers } = require('../routes/users_routes')
const { addPost } = require('../routes/posts_routes')
 


beforeAll(async () => {
    await connection.then((dataBase) => {
        getAllUsers(app, dataBase);
        addPost(app, dataBase)
    })
})

describe("test the routes path of users_routes", () => {
  it("Should respond to the GET method", async () => {
    await request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
