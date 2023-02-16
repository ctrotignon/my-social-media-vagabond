import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const handleSignUp = (event) => {
    event.preventDefault();

    let newUser = {
      userName: event.target.elements.userName.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };

    fetch(`http://localhost:5000/signup`, requestOptions).then((response) =>
      response.json()
    );
    navigate('/login');
    event.target.reset();

  };

  return (
    <div className="SignUp" >
      <form onSubmit={handleSignUp} className="SignUp_Container">
        <h2>Inscrivez-Vous</h2>
        <div>
          <label htmlFor="userName"></label>
          <input type="text" id="userName" placeholder="Nom d'utilisateur *" />
        </div>
        <div>
          <label htmlFor="email"></label>
          <input type="text" id="email" placeholder="Email *" />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input type="password" id="password" placeholder="Mot de passe *" />
          
        </div>
        <button className="SignUp_Button">INSCRIPTION</button>
      </form>
    </div>
  );
}
