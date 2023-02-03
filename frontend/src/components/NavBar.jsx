/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import "./navBar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../userContext";

function Navbar() {
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();
  const logOut = () => {
    if (userInfo.id !== undefined) {
      axios
        .post("http://localhost:5000/api/user/logOut")
        .then(() => {
          setUserInfo({});
          window.localStorage.removeItem("userData");
          navigate("/");
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="nav">
      <ul className="navBar">
        <NavLink className="navBar__item" to="/home">
          Home
        </NavLink>
        <NavLink className="navBar__item" to="/newPost">
          New post
        </NavLink>
        <NavLink className="navBar__item" to="/MyPosts">
          My Posts
        </NavLink>
        <li onClick={logOut} className="navBar__item">
          Logout
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
