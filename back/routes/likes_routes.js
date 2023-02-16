
function getAllLikesByPost(app, dataBase) {

    app.get('/getLikes/:id', (req, res) => {

        const requestSql = "SELECT COUNT(*) FROM likes WHERE post_id = ?"
        const postId = req.params.id;

        dataBase.query(requestSql, [postId],(err, data) => {
            if (err) return res.status(500).json({ err });
            const like = data[0]['COUNT(*)']
            return res.status(200).json(like);
        })
    
    })
}


function addLike(app, dataBase) {
    app.post("/addLike/:id", (req, res) => {
      const requestSql = "INSERT INTO likes (user_id, post_id) VALUES(?, ?)";
  
      const userId = req.body.userId;
      const postId = req.params.id

  
      dataBase.query(requestSql, [userId, postId], (err, data) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json({data, message: "Vous avez bien liké !" });
      });
    });
  }


function deleteLike(app, dataBase) {
    app.post("/deleteLike/:id", (req, res) => {
      const requestSql = "DELETE FROM likes WHERE user_id = ? AND post_id = ?";
  
      const userId = req.body.userId;
      const postId = req.params.id
  
      dataBase.query(requestSql, [userId, postId], (err, data) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json({data, message: "Vous avez supprimé votre like !" });
      });
    });
  }


  module.exports = {getAllLikesByPost, addLike, deleteLike};