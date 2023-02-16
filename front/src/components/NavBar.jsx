import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/userContext";

import Logo from "../assets/logo2.png";
import Home from "../assets/home.png";
import Chat from "../assets/chat.png";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="NavBar">
      {user.isLogged ? (
          <Link to={"/thread"}>
            <img src={Logo} alt="Logo" className="NavBar_Logo" />
          </Link>
        ) : (
          <Link to={"/home"}>
            <img src={Logo} alt="Logo" className="NavBar_Logo" />
          </Link>
        )}
      <form className="NavBar_Input">
        <input
          type="search"
          placeholder="Rechercher sur Vagabond"
          className="NavBar_Input"
        />
      </form>

      <div className="NavBar_ControlParamater">
        {user.isLogged ? (
          <Link to={"/thread"}>
            <img src={Home} alt="Home" className="NavBar_Icon" />
          </Link>
        ) : (
          <Link to={"/home"}>
            <img src={Home} alt="Home" className="NavBar_Icon" />
          </Link>
        )}
        {user.isLogged ? (
          <Link to={"/chat"}>
            <img src={Chat} alt="Chat" className="NavBar_Icon" />
          </Link>
        ) : (
          <Link to={"/login"}>
            <img src={Chat} alt="Chat" className="NavBar_Icon" />
          </Link>
        )}
        {user.isLogged ? (
          <>
            <Link to={"/myaccount"} className="NavBar-link">
              ACCOUNT
            </Link>
            <Link to={"/logout"} className="NavBar-link">
              DECONNEXION
            </Link>
          </>
        ) : (
          <>
            <div>
              <Link to={"/login"} className="NavBar-link">
                LOGIN
              </Link>
            </div>
            <div>
              <Link to={"/signup"} className="NavBar-link">
                INSCRIPTION
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
