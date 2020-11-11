import React from "react";
import MovieList from "./MovieList";
import Axios from "axios";
import {commonAPI, secretKey} from "../../../variable";
import "./Upcoming.css";

class Upcoming extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      total_pages: 1,
      upcomingList: [],
      isLoading: true,
    };

    this.getupComingList = this.getupComingList.bind(this);
  }

  componentDidMount() {
    this.getupComingList(1);
  }

  getupComingList = async(page) => {
    this.setState({isLoading: true});
    try{
      const upcoming_url = `${commonAPI}upcoming?api_key=${secretKey}&language=en-US&page=${page}`;
      await Axios.get(upcoming_url)
      .then(res => this.setState({total_pages : res.data.total_pages, upcomingList : res.data.results}))
      .catch(e => console.log(e));
    }catch(e){
      return e;
    }
    this.setState({isLoading: false});
  };

  render() {

    const { page, total_pages, upcomingList, isLoading } = this.state;

    return (
      <div>
        <div className="movie_header">
          <h2>Upcoming</h2>
          <input className="searching" placeholder="Searching" />
        </div>
        {isLoading ? <div>loading</div> : <GetEachMovie upcomingList={upcomingList} />}
      </div>
    );
  }
}


function GetEachMovie({ upcomingList }) {

  return (
    <div className="movie_wrapper">
      <div className="movie_lists">
        {upcomingList.map((movie, index) => (
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
            page={upcomingList.page}
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
