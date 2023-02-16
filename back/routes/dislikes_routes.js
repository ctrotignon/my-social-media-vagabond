
function getAllDislikesByPost(app, dataBase) {

    app.get('/getDislikes/:id', (req, res) => {

        const requestSql = "SELECT COUNT(*) FROM dislikes WHERE post_id = ?"
        const postId = req.params.id;

        dataBase.query(requestSql, [postId],(err, data) => {
            if (err) return res.status(500).json({ err });
            const like = data[0]['COUNT(*)']
            return res.status(200).json(like);
        })
    
    })
}


function addDislike(app, dataBase) {
    app.post("/addDislike/:id", (req, res) => {
      const requestSql = "INSERT INTO dislikes (user_id, post_id) VALUES(?, ?)";
  
      const userId = req.body.userId;
      const postId = req.params.id

  
      dataBase.query(requestSql, [userId, postId], (err, data) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json({data, message: "Vous avez bien disliké !" });
      });
    });
  }


function deleteDislike(app, dataBase) {
    app.post("/deleteDislike/:id", (req, res) => {
      const requestSql = "DELETE FROM dislikes WHERE user_id = ? AND post_id = ?";
  
      const userId = req.body.userId;
      const postId = req.params.id
  
      dataBase.query(requestSql, [userId, postId], (err, data) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json({data, message: "Vous avez supprimé votre dislike !" });
      });
    });
  }


  module.exports = {getAllDislikesByPost, addDislike, deleteDislike};