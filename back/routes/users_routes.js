const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// A quoi sert cette fonction? Ele s'appelle "getAllUsers" mais ne retourne pas d'utlisateurs...
// Si tu veux juste un endpoint à la con pour checker si ton serveur tourne tu l'appelle ping (path /ping) et tu retournes systématiquement un code 200  
function getAllUsers(app) {
  app.get("/", (req, res) => {
    res.json("Bien connecté");
  });
}

// tu ne fais aucun check sur le userName, l'email et le password (taille minimum, format de l'email, etc...). Tu ne peux pas te contempter de les faires côté front vu qu'un petit malin pourrait s'amuser à directement appeler ton api
// tu ne check pas si un utilisateur avec le même username / email existe déjà
function SignUp(app, dataBase) {
  app.post("/signup", (req, res) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const userName = req.body.userName;
        const email = req.body.email;
        const password = hash;
        // tu créés une variable responseDataBase que tu n'utilises pas. Soit tu check le resultat soit tu ne le stock pas dans une variable
        const responseDataBase = dataBase.query(
          "INSERT INTO users (userName, email, password) VALUES(?,?,?)",
          [userName, email, password]
        );
        // lorsque tu créés quelque chose le code http devrait être 201 (Created) au lieu de 200 (Ok)
        res.json({ status: 200, message: "Utilisateur bien créé "});
      })
      .catch((error) => {
        // retourner l'erreur en brut comme ça est une mauvaise pratique, ça peut donner des infos sur la structure de ta base de donnée. A la place il est conseillé d'écrire toi même une erreur un peu plus générique
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
        // priorité basse : sur une méthode de login si quelque chose foire on retourne toujours le même status (401 je crois) et un message super générique genre "login failed" pour éviter de donner des infos à de potentiels hackers
        res.json({status:404, message:"Email doesn't exist"})
    } else {
        const matchPassword = await bcrypt.compare(req.body.password, user[0].password)
        
    
        if(matchPassword){
            const token = jwt.sign({id : user[0].id},process.env.SECRET_TOKEN,{expiresIn:'1h'})
            // priorité basse : quand une requète est un succès on ne retorune pas de message pour dire que tout est ok, juste le bon code http et les infos dont on a besoin.
            // priorité basse : généralement l'endpoint de login ne retourne que le token, et on a un autre endpoint pour récupérer les données de l'utilisateur courant (/users/me)
            res.json({status:200, message : 'User is connected', token, user : user[0]})
        } else {
            res.json({status:401, message:"Wrong password"})
        }
    }

})}

// le nom withAuth n'est pas clair du tout, j'aurais plutôt mis un truc du genre checkAuthenticationToken 
function withAuth(req, res, next) {
  // log pas utile
  console.log(req.headers);
  const token = req.headers["authorization"];
  if (token === null || token === undefined) {
    // message d'erreur bizarre, à remplacer par un truc du genre "authentication required"
    res.json({ status: 401, msg: "bad token 1" });
  }
  jwt.verify(token, process.env.SECRET_TOKEN, function (err, decoded) {
    if (err) {
    // le code d'erreur devrait être 498 (invalid token), et soit tu ne mets pas de message soit tu en mets un générique
      res.json({ status: 401, msg: "bad token 2" });
      console.log(err);
    }
    req.body.id = decoded.id;
    next();
  });
}

// cet endpoint est le seul qui check ton token et il n'est pas utilisé par le front, en gros backend n'est pas sécurisé, n'importe qui peut appeler tes apis comments, likes, displikes et posts sans être authentifié.
// en fait je pense que t'étais parti sur la bonne fois avec ta méthode withAuth mais que tu t'es perdu en chemin (si proche du but !). ta fonction withAuth est déjà un middleware, mais tu ne l'utlises pas correctement.
// lis ça https://expressjs.com/fr/guide/writing-middleware.html et on pourra s'appeler pour voir ce qui manque 
function checkToken(app, dataBase) {

  app.get('/checkToken', withAuth, async(req,res) =>{
    const user = await dataBase.query(
      `SELECT * FROM users WHERE id= ?`, [req.body.id]
    );
    res.json({status:200, msg:"token ok", user:user[0]})
})

}

  

module.exports = { getAllUsers, SignUp, Login, withAuth, checkToken };
