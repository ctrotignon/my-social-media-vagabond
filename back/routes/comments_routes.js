function getComments(app, dataBase) {
    app.get("/getComments/:id", (req, res) => {
      const requestSql =
        "SELECT comments.* FROM comments JOIN users ON ( user_id = users.id) WHERE comments.post_id = ?";

        const postId = req.params.id;
        
      dataBase.query(requestSql, [postId], (err, data) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json(data);
      });
    });
  }


function addComment(app, dataBase) {
    app.post("/addComment/:id", (req, res) => {
      const requestSql = "INSERT INTO comments (content,user_id, post_id) VALUES(?, ?, ?)";
  
      const comment = req.body.comment;
      const userId = req.body.userId;
      const postId = req.params.id

  
      dataBase.query(requestSql, [comment,userId, postId], (err, data) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json({data, message: "Commentaire bien créé !" });
      });
    });
  }


  module.exports = {getComments, addComment};