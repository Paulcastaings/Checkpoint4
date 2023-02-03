/* eslint-disable no-return-assign */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import BottomNav from "../components/BottomNav";
import { useUser } from "../userContext";
import "./newPost.scss";
import NavBar from "../components/NavBar";

function NewPost() {
  const { userInfo } = useUser();
  const [countryList, setCountryList] = useState([]);
  const [file, setFile] = useState({
    fileName: "",
    file: "",
  });
  const [addNewPost, setAddNewPost] = useState({
    country: null,
    adTitle: null,
    adDescription: null,
  });

  const [filePreview, setFilePreview] = useState();

  const getAllCountries = () => {
    axios
      .get("http://localhost:5000/api/utils/allcountries")
      .then((response) => setCountryList(response.data));
  };

  const handleOnChange = (e) => {
    setAddNewPost({
      ...addNewPost,
      [e.target.name]: e.target.value,
    });
  };
  const inputRef = useRef(null);

  const formToObject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = {};
    formData.forEach((value, key) => (formDataObj[key] = value));
    console.warn(formDataObj);
    axios
      .post(
        "http://localhost:5000/api/post",
        {
          user_id: userInfo.id,
          country_id: formDataObj.country,
          title: formDataObj.adTitle,
          description: formDataObj.adDescription,
          photo: inputRef.current.files[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then()
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    let objectUrl;
    getAllCountries();
    if (!file.file) {
      setFilePreview("src/assets/photo/LogoImg.png");
    } else {
      objectUrl = URL.createObjectURL(file.file);
      setFilePreview(objectUrl);
    }
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile({
      fileName: e.target.files[0].name,
      file: e.target.files[0],
    });
  };

  return (
    <div className="background">
      <NavBar />
      <div className="headBannerPost">
        <span>NEW POST</span>
      </div>
      <div className="newPost">
        <form
          encType="multipart/form-data"
          className="newPost__form"
          onSubmit={formToObject}
          action=""
        >
          <div className="newPost__titlePost">
            <input
              type="text"
              id="adTitle"
              name="adTitle"
              placeholder="Choose a title"
              onChange={handleOnChange}
            />
            <div className="newPost__allSelect">
              <select
                className="newPost__selectCountry"
                onChange={handleOnChange}
                name="country"
              >
                <option value="country">Select a country</option>
                {countryList.map((country) => (
                  <option value={country.id}>{country.name}</option>
                ))}
              </select>
            </div>
            <div className="newPost__description">
              <textarea
                className="newPost__adDescription"
                id="adDescription"
                name="adDescription"
                onChange={handleOnChange}
                placeholder="A detailed description of your photo"
              />
            </div>
          </div>
          <div className="newPost__picture">
            <img
              className="newPost__adPicture"
              src={filePreview}
              alt="adPicture"
            />
            <input
              className="newPost__btn"
              style={{ display: "none" }}
              type="file"
              name="photo"
              ref={inputRef}
              id="file"
              accept="image/*"
              onChange={handleFile}
            />
            <label htmlFor="file" className="newPost__uploadBtn">
              ADD YOUR PHOTO
            </label>

            <div className="newPost__publish">
              <button className="newPost__btn" action="" type="submit">
                POST{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
