const express = require("express");
const app = express();
const mysql = require("promise-mysql");
require("dotenv").config();
const cors = require("cors");
const usersRoutes = require("./routes/users_routes");
const postsRoutes = require('./routes/posts_routes');
const commentsRoutes = require('./routes/comments_routes');
const likesRoutes = require('./routes/likes_routes');
const dislikesRoutes = require('./routes/dislikes_routes');

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

const connectionOptions = {
  host: "localhost",
  database: "Vagabond",
  user: "root",
  password: "root",
  port: 8889,
};

const connection = mysql.createConnection(connectionOptions)
.then((dataBase) => {
  usersRoutes.getAllUsers(app, dataBase);
  usersRoutes.SignUp(app, dataBase);
  usersRoutes.Login(app, dataBase);
  usersRoutes.checkToken(app, dataBase);

  postsRoutes.getPosts(app, dataBase);
  postsRoutes.addPost(app, dataBase);

  commentsRoutes.getComments(app, dataBase);
  commentsRoutes.addComment(app, dataBase);

  likesRoutes.getAllLikesByPost(app, dataBase);
  likesRoutes.addLike(app, dataBase);
  likesRoutes.deleteLike(app, dataBase);

  dislikesRoutes.getAllDislikesByPost(app, dataBase);
  dislikesRoutes.addDislike(app, dataBase);
  dislikesRoutes.deleteDislike(app, dataBase);
})


app.listen(5000, () => {
  console.log(`Serveur connecté sur le port : ${port}`);
});
