/* eslint-disable no-return-assign */
import axios from "axios";
import React, { useState } from "react";
import "./signUp.scss";
import { NavLink, useNavigate } from "react-router-dom";

function SignIn() {
  const [addNewUser, setAddNewUser] = useState({
    firstname: null,
    lastname: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setAddNewUser({
      ...addNewUser,
      [e.target.name]: e.target.value,
    });
  };
  const formToObject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    axios
      .post("http://localhost:5000/api/user", {
        firstname: formDataObj.firstname,
        lastname: formDataObj.lastname,
        password: formDataObj.password,
        email: formDataObj.email,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="backgroundSignUp">
      <div className="signIn">
        <div className="signInPage">
          <h1 className="title"> YOU WONT REGRET IT !</h1>
          <form className="signIn__form" onSubmit={formToObject} action="">
            <div className="formDesktop">
              <input
                className="firstnameInput"
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Firstname"
                onChange={handleOnChange}
              />
              <input
                className="lastnameInput"
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Lastname"
                onChange={handleOnChange}
              />
            </div>
            <input
              className="emailInput"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleOnChange}
            />
            <input
              className="passwordInput"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleOnChange}
            />
            <button type="submit" className="signupButton">
              SIGN UP
            </button>
          </form>
          <div className="signUpformbanner">
            <p>Already have an account ?</p>
            <NavLink to="/">
              <p className="login">Login</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
