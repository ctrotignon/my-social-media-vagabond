import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";

import DislikeImage from "../assets/dislike.png";
import DislikeColored from "../assets/dislikeColored.png";

export default function Like({ postId }) {
  const [updatingDislike, setUpdatingDislike] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [isDislikeClicked, setiIsDislikeClicked] = useState(true);
  const { user, setUser } = useContext(UserContext);

  

  const handleAddDislike = (event) => {
    event.preventDefault();

    let newDislike = {
      userId: user.infos.id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDislike),
    };

    fetch(`http://localhost:5000/addDislike/${postId}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      setUpdatingDislike((updatingDislike) => !updatingDislike);
      setiIsDislikeClicked(!isDislikeClicked)
    })

    event.target.reset();
  };


  const handleDeleteDislike = (event) => {
    event.preventDefault();

    let deletedDislike = {
      userId: user.infos.id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deletedDislike),
    };

    fetch(`http://localhost:5000/deleteDislike/${postId}`, requestOptions).then(
      (response) => {
        response.json();
        setUpdatingDislike((updatingDislike) => !updatingDislike);
        setiIsDislikeClicked(!isDislikeClicked);
      }
    );

   

    event.target.reset();
  };

  useEffect(() => {
    fetch(`http://localhost:5000/getDislikes/${postId}`)
      .then((response) => response.json())
      .then((data) => setDislikes(data))
     
  }, [updatingDislike]);

  return (
    <div>
    {isDislikeClicked ? (
        <div className="Dislike_Container" >

      <form onSubmit={handleAddDislike}>
      <button className="Dislike_Button">

          <img
            src={DislikeImage}
            alt=""
            className="Post_icon" 
          />
      </button>
        </form>
        <p>Je n'aime pas : {dislikes}</p>
        </div>
     
    ) : (
        <div className="Dislike_Container">

      <form onSubmit={handleDeleteDislike}>
      <button className="Dislike_Button">

          <img
            src={DislikeColored}
            alt=""
            className="Post_icon" 
            />
      </button>
        </form>
        <p>{dislikes === 1 ? `Vous n'aimez pas ça` : `Vous et  ${dislikes - 1} personnes n'aiment pas ça`}</p>
            </div>

    )}
    </div>
  );
}
