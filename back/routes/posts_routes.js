function getPosts(app, dataBase) {
  app.get("/getPosts", (req, res) => {
    const requestSql =
      "SELECT posts.*, userName FROM posts JOIN users ON (users.id = posts.users_id)";
      
    dataBase.query(requestSql, [], (err, data) => {
      if (err) return res.status(500).json({ err });
      return res.status(200).json(data);
    });
  });
}

function addPost(app, dataBase) {
  app.post("/addPost", (req, res, err) => {
    const requestSql = "INSERT INTO posts (content, users_id) VALUES (?, ?)";

    const content = req.body.content;
    const id = req.body.id;
    console.log(Object.keys(req.body).length);
    if(Object.keys(req.body).length > 2){
      return res.status(500).json({ err })
    } 
    dataBase.query(requestSql, [content, id], (err, data) => {
      if (err) return res.status(500).json({ err });
      return res.status(200).json({data, message: "Post bien créé !" });
    });
  });
}

// function deletePost(app, dataBase) {
//   app.delete('/deletePost',(req,res)=>{

//     const id = req.body.id;
    
//     db.query("DELETE FROM posts WHERE id= ?", id, (err,data)=>{
//       if (err) return res.status(500).json({ err });
//       return res.status(200).json({data, message: "Post bien supprimé !" });
//     });
// });
// }

module.exports = { getPosts, addPost}
