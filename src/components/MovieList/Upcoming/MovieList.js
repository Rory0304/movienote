import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Movie from "../../Movie/Movie";

function MovieList({ title, date, poster, id, overview, rating }) {
  const link = {
    pathname: `/movie/${id} ${title}`,
    state: {
      id: id,
      poster: poster,
      title: title,
      date: date,
      overview: overview,
      rating: rating,
    },
  };

  return (
    <div className="movie_list">
      {poster === null ? (
        <div className="null_poster"> </div>
      ) : (
        <img
          src={"http://image.tmdb.org/t/p/w185" + poster}
          alt={title}
          title={title}
        ></img>
      )}
      <div className="movie_info">
        <Link to={link}>
          <h3> {title} </h3>
        </Link>
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
  rating: PropTypes.number.isRequired,
};

export default MovieList;
