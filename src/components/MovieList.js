import React from "react";
import PropTypes from "prop-types";

function MovieList({ title, date, poster }) {
  return (
    <div className="movie-list">
      <img src={poster} alt={title} title={title}></img>
      <div className="movie-info">
        <h3> {title} </h3>
        <p>{date}</p>
      </div>
    </div>
  );
}

MovieList.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default MovieList;
