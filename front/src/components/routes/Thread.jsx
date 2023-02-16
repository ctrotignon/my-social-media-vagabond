import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";


import Comment from "../Comment";
import Like from "../Like";
import Dislike from "../Dislike";



import Comments from "../../assets/comments.png";
import Share from "../../assets/share.png";
import Save from "../../assets/save.png";

export default function Thread() {
  const [updating, setUpdating] = useState(false);
  const [updatingComment, setUpdatingComment] = useState(false);
  const [isCommentClicked, setIsCommentClicked] = useState(false);

  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const handleClickComment = () => {
    setIsCommentClicked(!isCommentClicked)
  }

  const handleAddPost = (event) => {
    event.preventDefault();

    let newPost = {
      content: event.target.elements.content.value,
      id: user.infos.id,
    };
   
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    };

    fetch(`http://localhost:5000/addPost`, requestOptions).then((response) => {
      response.json();
      setUpdating((updating) => !updating);
    });

    event.target.reset();
  };

  useEffect(() => {
    fetch(`http://localhost:5000/getPosts`)
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, [updating]);


  return (
    <div className="Thread_Container">
      <form onSubmit={handleAddPost} className="Post_Container">
        <h2 className="AddPost_Title">Créer une publication</h2>
        <div>
          <label htmlFor="content"></label>
          <input
            type="text"
            id="content"
            placeholder={`Quoi de neuf ?`}
            className="AddPost_Input"
          />
        </div>
        <button className="AddPost_Button">PUBLIER</button>
      </form>
      {posts
        .slice(0)
        .reverse()
        .map((post) => {
         
          return (
            <div key={post.id} className="Post_Container">
              <div className="Post_Header">
                <h3>{post.userName}</h3>
                <p>{post.timestamp}</p>
              </div>
              {post.content.includes("http") ? (
                <img src={post.content} alt="" />
              ) : (
                <p className="Post_Content">{post.content}</p>
              )}
              <div className="Post_Footer">
                <div className="Post_FooterLeftSide">
                  <Like postId = {post.id} className="Post_icon" />
                  < Dislike postId = {post.id} className="Post_icon" />
                  <button onClick={handleClickComment} className="Comment_Icon">
                    <img 
                      src={Comments}
                      alt=""
                      className="Post_icon"
                    />
                  </button>
                </div>
                <div className="Post_FooterRightSide">
                  <img src={Share} alt="" className="Post_icon" />
                  <img src={Save} alt="" className="Post_icon" />
                </div>
              </div>
              {isCommentClicked && <Comment postId={post.id} className="Post_icon"/> }

            </div>
          );
        })}
    </div>
  );
}
