import React from "react";
import MovieList from "../components/MovieList";
import Axios from "axios";

class Upcoming extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url:
        "https://api.themoviedb.org/3/movie/upcoming?api_key=b1306395631dc84cde154096963c13db&region=US",
      page: 1,
      total_pages: 1,
      db: [],
      isloading: true,
    };
  }

  getMovieList = async (page) => {
    const new_url = this.state.url + "&page=" + page;
    const { data } = await Axios.get(new_url);
    this.setState({
      url: new_url,
      isloading: false,
      db: data,
      page: data.page,
      total_pages: data.total_pages,
    });
  };

  componentDidMount() {
    this.getMovieList(1);
  }

  render() {
    const { page, total_pages, db, isloading } = this.state;
    console.log(db.results);

    return (
      <div>
        <div className="movie_header">
          <h2>Now Playing</h2>
          <input className="searching" />
        </div>
        {isloading ? <div>loading</div> : <GetEachMovie db={db} />}
      </div>
    );
  }
}

function GetEachMovie({ db }) {
  return (
    <div className="movie_wrapper">
      <div className="movie_lists">
        {db.results.map((movie) => (
          <MovieList
            id={movie.id}
            title={movie.title}
            key={movie.id}
            date={movie.release_date}
            overview={movie.overview}
            poster={movie.poster_path}
            page={db.page}
          />
        ))}
      </div>
      <div className="movie_load">
        <button>load more</button>
      </div>
    </div>
  );
}

export default Upcoming;
