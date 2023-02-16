const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

function getAllUsers(app) {
  app.get("/", (req, res) => {
    res.json("Bien connecté");
  });
}

function SignUp(app, dataBase) {
  app.post("/signup", (req, res) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const userName = req.body.userName;
        const email = req.body.email;
        const password = hash;

        const responseDataBase = dataBase.query(
          "INSERT INTO users (userName, email, password) VALUES(?,?,?)",
          [userName, email, password]
        );
        res.json({ status: 200, message: "Utilisateur bien créé "});
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
}

function Login(app, dataBase) {
  app.post("/login", async (req, res) => {
    const user = await dataBase.query(
      `SELECT id, email, password FROM users WHERE  email = ?`, [req.body.email]
    );
    
    if(user.length === 0){
        res.json({status:404, message:"Email doesn't exist"})
    } else {
        const matchPassword = await bcrypt.compare(req.body.password, user[0].password)
        
    
        if(matchPassword){
            const token = jwt.sign({id : user[0].id},process.env.SECRET_TOKEN,{expiresIn:'1h'})
            res.json({status:200, message : 'User is connected', token, user : user[0]})
        } else {
            res.json({status:401, message:"Wrong password"})
        }
    }

})}

function withAuth(req, res, next) {
  console.log(req.headers);
  const token = req.headers["authorization"];
  if (token === null || token === undefined) {
    res.json({ status: 401, msg: "bad token 1" });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    if (err) {
      res.json({ status: 401, msg: "bad token 2" });
      console.log(err);
    }
    req.body.id = decoded.id;
    next();
  });
}

function checkToken(app, dataBase) {

  app.get('/checkToken', withAuth, async(req,res) =>{
    const user = await dataBase.query(
      `SELECT * FROM users WHERE id= ?`, [req.body.id]
    );
    res.json({status:200, msg:"token ok", user:user[0]})
})

}

  

module.exports = { getAllUsers, SignUp, Login, withAuth, checkToken };
