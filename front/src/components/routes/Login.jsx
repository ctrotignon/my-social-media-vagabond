import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

export default function Login() {

  const [redirect, setRedirect] = useState(false)
  const {user, setUser} = useContext(UserContext)

  const handleLogin = (event) => {
    event.preventDefault();

    let userBody = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userBody),
    };

    fetch(`http://localhost:5000/login`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if(res.status === 200) {

          localStorage.setItem('token', res.token)
          setUser({
            isLogged: true,
            infos : res.user
        })
        setRedirect(true)
        }
      })
      
      console.log(user);

    event.target.reset();
  };

  if(redirect){
    return <Navigate to="/thread"/>
}

  return (
    <div className="Login">

    <form onSubmit={handleLogin} className="Login_Container">
      <h2>Connectez-vous</h2>
      <div>
        <label htmlFor="email"></label>
        <input type="text" id="email" placeholder="Email *"/>
      </div>
      <div>
        <label htmlFor="password"></label>
        <input type="password" id="password" placeholder="Mot de passe *"/>
      </div>
      <button className="Login_Button">CONNEXION</button>
    </form>
    </div>
  );
}
