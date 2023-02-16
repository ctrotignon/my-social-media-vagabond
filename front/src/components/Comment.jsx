import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Comments({postId}) {
  const [updatingComment, setUpdatingComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentClicked, setiIsCommentClicked] = useState(false);
  const { user, setUser } = useContext(UserContext);
  

  const handleAddComment = (event) => {
    event.preventDefault();

    let newComment = {
      comment: event.target.elements.comment.value,
      userId : user.infos.id
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    };

    fetch(`http://localhost:5000/addComment/${postId}`, requestOptions).then(
      (response) => {
        response.json();
        setUpdatingComment((updatingComment) => !updatingComment);
      }
    );

    event.target.reset();
  };

  useEffect(() => {
    fetch(`http://localhost:5000/getComments/${postId}`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [updatingComment]);

  return (
    <>
      <div >
        {comments.map((comment, index) => {
          
          return (
            <div className="Comment_Container" key={index}>
              <p className="Comment_Content">{comment.content}</p>
            </div>
          );
        })}
      </div>
      {}
      <form onSubmit={handleAddComment} >
        <input className="Comment_Input"
          type="text"
          id="comment"
          placeholder="Écrivez un commentaire ..."
        />
      </form>
    </>
  );
}
