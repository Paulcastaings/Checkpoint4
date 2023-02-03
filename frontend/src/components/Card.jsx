/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import "./card.scss";

function Card({ post, id }) {
  return (
    <div id={id} className="card">
      <div className="card__header">
        <NavLink to={`/annonce/${post.id}`}>
          <img src={`/uploads/${post.photo} `} alt="" />
        </NavLink>
      </div>
      <div className="card__bodyOpen">
        <div className="card__bodyOpen__annonceInfo">
          <h3 className="card__body__annonceInfo__title">{post.title}</h3>
          <span className="card__body__annonceInfo__userInfo">
            {post.userName}
          </span>
          <p className="card__bodyOpen__annonceInfo__userDescription">
            {post.description}
          </p>
        </div>
        <div className="card__bodyOpen__icons" />
      </div>
    </div>
  );
}

Card.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    userName: PropTypes.string,
    photo: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  id: PropTypes.number.isRequired,
};

export default Card;
