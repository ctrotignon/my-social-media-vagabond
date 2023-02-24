const { app, connection } = require("../app");
const request = require("supertest");
const { response } = require("../app");
const mysql = require("promise-mysql");

const { getAllLikesByPost, addLike, deleteLike } = require('../routes/likes_routes');
const { describe } = require("node:test");



beforeAll( async() => {
    await connection.then((dataBase) => {
        getAllLikesByPost(app, dataBase);
        addLike(app, dataBase)
        deleteLike(app, dataBase)
    });
})

describe('test the routes path of likes_routes', () => {
    it('Should respond to the GET method', async () => {
        await request(app)
        .get('/getLikes/395')
        .then(response => {
            expect(response.statusCode).toBe(200);
        });
    }),

    it('Should add a like', async() => {
        await request(app)
        .post('/addLike/2')
        .send({userId : 356})
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
    })

    it('Should delete a like', async() => {
        await request(app)
        .post('/deleteLike/2')
        .send({userId : 356})
        .then(response => {
            expect(response.statusCode).toBe(200)
        })
    })
})