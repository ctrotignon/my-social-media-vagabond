import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

import LikeImage from "../assets/like.png";
import LikeColored from "../assets/likeColored.png";

export default function Like({ postId }) {
  const [updatingLike, setUpdatingLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likesImage, setLikesImage] = useState({LikeImage})
  const [isLikeClicked, setiIsLikeClicked] = useState(true);
  const { user, setUser } = useContext(UserContext);

  

  const handleAddLike = (event) => {
    event.preventDefault();

    let newLike = {
      userId: user.infos.id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLike),
    };

    fetch(`http://localhost:5000/addLike/${postId}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      setUpdatingLike((updatingLike) => !updatingLike);
      // setLikesImage({LikeColored})
      setiIsLikeClicked(!isLikeClicked)
    })

    event.target.reset();
  };


  const handleDeleteLike = (event) => {
    event.preventDefault();

    let deletedLike = {
      userId: user.infos.id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deletedLike),
    };

    fetch(`http://localhost:5000/deleteLike/${postId}`, requestOptions).then(
      (response) => {
        response.json();
        setUpdatingLike((updatingLike) => !updatingLike);
        setiIsLikeClicked(!isLikeClicked);
      }
    );

   

    event.target.reset();
  };

  useEffect(() => {
    fetch(`http://localhost:5000/getLikes/${postId}`)
      .then((response) => response.json())
      .then((data) => setLikes(data))
     
  }, [updatingLike]);

  return (
    <div>
    {isLikeClicked ? (
      <div className="Like_Container">
      <form onSubmit={handleAddLike}>
      <button className="Like_Button">

          <img
            src={LikeImage}
            alt=""
            className="Post_icon" 
            />
      </button>
        </form>
        <p>J'aime : {likes}</p>
            </div>
     
    ) : (
      <div className="Like_Container">
      <form onSubmit={handleDeleteLike}>
      <button className="Like_Button">

          <img
            src={LikeColored}
            alt=""
            className="Post_icon" 
            />
      </button>
        </form>
        <p>{likes === 1 ? `Vous aimez ça` : `Vous et  ${likes - 1} personnes aiment  ça`}</p>
            </div>

    )}
    
     
    </div>
  );
}
