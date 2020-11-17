import React from "react";
import MovieList from "./MovieList";
import Axios from "axios";
import {commonAPI, secretKey} from "../../../variable";
import "./Toprated.css";

class Toprated extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      total_pages: 1,
      topratedList: [],
      isLoading: true,
    };

    this.gettopratedList = this.gettopratedList.bind(this);
  }

  componentDidMount() {
    this.gettopratedList(1);
  }

  gettopratedList = async(page) => {
    this.setState({isLoading: true});
    try{
      const toprated_url = `${commonAPI}top_rated?api_key=${secretKey}&language=en-US&page=${page}`;
      await Axios.get(toprated_url)
      .then(res => this.setState({total_pages : res.data.total_pages, topratedList : res.data.results}))
      .catch(e => console.log(e));
    }catch(e){
      return e;
    }
    this.setState({isLoading: false});
  };

  render() {

    const { page, total_pages, topratedList, isLoading } = this.state;

    return (
      <div>
        <div className="movie_header">
          <h2>TopRated</h2>
          <input className="searching" placeholder="Searching" />
        </div>
        {isLoading ? <div>loading</div> : <GetEachMovie topratedList={topratedList} />}
      </div>
    );
  }
}


function GetEachMovie({ topratedList }) {

  return (
    <div className="movie_wrapper">
      <div className="movie_lists">
        {topratedList.map((movie, index) => (
          <MovieList
            id={movie.id}
            index={index}
            title={movie.title}
            key={movie.id}
            date={movie.release_date}
            overview={movie.overview}
            poster={movie.poster_path}
            backdrop={movie.backdrop_path}
            popularity={movie.popularity}
            page={topratedList.page}
          />
        ))}
      </div>
      <div className="movie_load">
        <button>load more</button>
      </div>
    </div>
  );
}

export default Toprated;
