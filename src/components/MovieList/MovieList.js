import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Movie from "../Movie/Movie";

class MovieList extends React.Component {

  constructor(props){
    super(props);

  }

  render(){

    if(this.props.isLoaindg){
      return(
        <div className="movie_list">loading</div>
      )
    }

    return (

    <Link to={{
      pathname : `/movie/${this.props.id}/${this.props.title}`,
      state : {
        id : this.props.id,
        poster : this.props.poster,
        title : this.props.title,
        date : this.props.date,
        overview : this.props.overview,
        rating : this.props.rating,
        backdrop : this.props.backdrop,
        popularity : this.props. popularity
      }}}
      style={{ textDecoration: 'none' }}>

      <div className="movie_list">
        {this.props.poster === null ? (
        <div className="null_poster"> </div>) : (
        <img
          src={"http://image.tmdb.org/t/p/w185" + this.props.poster}
          alt={this.props.title}
          title={this.props.title}
        />
        )}
        <div className="movie_info">
          <h3> {this.props.title} </h3>
          <p>{this.props.date}</p>
        </div>
      </div>
    </Link>
  );
}
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
