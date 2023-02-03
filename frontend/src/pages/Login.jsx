/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";
import "./login.scss";

function Login() {
  const { setUserInfo } = useUser();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    axios
      .post("http://localhost:5000/api/user/login", {
        email: formDataObj.email,
        password: formDataObj.password,
      })
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem(
            "userData",
            JSON.stringify(response.data)
          );
          setUserInfo(response.data);
        }
        navigate("/home");
      })
      .catch((err) => {
        setError(err.request.status);
      });
  };

  return (
    <div className="backgroundLogin">
      <div className="login">
        <div className="login__form">
          <div className="login__sheet" />
          <h1 className="login__form__title">
            Let's your journey begins ! <br />
          </h1>
          <form className="login__form__field" onSubmit={handleForm}>
            <input
              placeholder="Enter your Email"
              type="email"
              id="email"
              name="email"
            />
            <input
              placeholder="Enter your Password"
              type="password"
              name="password"
              id="password"
            />
            {error === 404 ? (
              <span className="error">Wrong password, try again.</span>
            ) : error === 401 ? (
              <span className="error">
                You don't have any account? please{" "}
                <NavLink to="/signUp">
                  <p className="signup__underline">Sign up</p>
                </NavLink>
              </span>
            ) : undefined}
            {/* */}

            <button className="login__form__field__button" type="submit">
              LOGIN
            </button>
          </form>
          <div className="login__form__banner">
            <p>Don't have an account yet?</p>
            <NavLink to="/signUp">
              <p className="login__form__banner__signup">Sign up</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
