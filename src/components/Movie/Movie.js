import React  from "react";
import Review from "../Review/Review";
import Axios from "axios";
import "./Movie.css";
import {commonAPI, secretKey} from "../../variable";
import MovieReviewSample from "./MovieReviewSample.js";


class Movie extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      id: this.props.location.state.id,
      poster: this.props.location.state.poster,
      title: this.props.location.state.title,
      date: this.props.location.state.date,
      overview: this.props.location.state.overview,
      backdrop : this.props.location.state.backdrop,
      popularity: this.props.location.popularity,
      casts: [],
      review: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMovieCasts = this.getMovieCasts.bind(this);

    this.reviewSection = React.createRef();
  }

  componentDidMount() {
    this.getMovieCasts();
    window.scrollTo(0, 0);
  }

  /* review section*/
  handleChange(event) {
    this.setState({review: event.target.value});
  }

  handleSubmit(event) {

  }

  openCloseReview = () => {
    console.log("here");
    if(this.reviewSection.current.style.display === "block"){
      this.reviewSection.current.style.display = "none";
    }
    else{
      this.reviewSection.current.style.display = "block";
    }
  }

  /* get movie casts list*/
  getMovieCasts = async() => {
    try{
      const cast_url = `${commonAPI}${this.state.id}/credits?api_key=${secretKey}`;
      await Axios.get(cast_url).then(res => this.setState({casts : res.data.cast}));
    }catch(e){
      return e;
    }
  };

  render() {
    const { id, poster, title, date, overview, casts, backdrop, popularity } = this.state;
    const posterSrc = poster === null ? null : "http://image.tmdb.org/t/p/w185" + poster;
    const backdropSrc = backdrop === null? null : "https://image.tmdb.org/t/p/original" + backdrop;
    
    console.log(popularity);
    return (
      <div ref={this.wrapper}>
        <div className="movie_detail_header">
          <div className="header_backdrop" style={{ backgroundImage : `url(${backdropSrc})`}}></div>
          {poster === null ? (
            <div className="header_noposter poster"></div>
          ) : (
            <img className="header_poster poster" src={posterSrc} alt={title} />
          )}
          <div className="header_info">
            <h2>{title}</h2>
            <p>{date}</p>
            <p>{popularity}</p>
            <button>Movie Note</button>
            <button onClick={this.openCloseReview}>Review</button>
          </div>
        </div>

        <form className="reviewPage" onSubmit={this.handleSubmit} ref={this.reviewSection}>
          <header>
            <div className="reviewCancel" onClick={this.openCloseReview}>취소</div>
            <input type="submit" value="저장" class="reviewSave" />
            <em> {title}</em>
          </header>
          <div className="reviewTextarea">
            <textarea value={this.state.review} onChange={this.handleChange} placeholder="리뷰 작성"></textarea>
          </div>
        </form>

        <div className="movie_detail_contents">
          <section className="overview">
            <h3 className="section_header">Overview</h3>
            <p>{overview}</p>
          </section>

          <section className="Top Billed Cast">
            <h3 className="section_header">Top Billed Cast</h3>
            <div className="casts">
              {casts.map((cast) => {
                return (
                  <CastInfo
                    key={cast.id}
                    character={cast.character}
                    name={cast.name}
                    profile_path={cast.profile_path}
                  />
                );
              })}
            </div>
          </section>

          <section className="Review">
            <h3 className="section_header">Review</h3>
            <div>
              <MovieReviewSample />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

/* componenet of movie cast info section*/
class CastInfo extends React.Component {
  render() {
    const { character, name, profile_path } = this.props;
    const new_profile_path =
      profile_path === null
        ? null
        : "https://image.tmdb.org/t/p/w138_and_h175_face/" + profile_path;
    return (
      <div className="cast">
        {profile_path === null ? (
          <div className="profile_null"></div>
        ) : (
          <img className="profile_img" src={new_profile_path} alt={name} />
        )}
        <div className="cast_info">
          <p className="cast_name">{name}</p>
          <p className="cast_character">{character}</p>
        </div>
      </div>
    );
  }
}

export default Movie;
