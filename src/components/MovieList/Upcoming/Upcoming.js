import React from "react";
import MovieList from "../MovieList";
import Axios from "axios";
import {commonAPI, secretKey} from "../../../variable";
import "../MovieList.css";

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
    this.infiniteScroll = this.infiniteScroll.bind(this);
  }

  componentDidMount() {
    this.getupComingList(1);
    window.addEventListener('scroll',this.infiniteScroll, true);
  }

  getupComingList = async(page) => {
    this.setState({isLoading: true});
    try{
      const upcoming_url = `${commonAPI}upcoming?api_key=${secretKey}&language=en-US&page=${page}`;
      await Axios.get(upcoming_url)
      .then(res => {
        const fetchData = res.data.results;
        this.setState({page : page, total_pages : res.data.total_pages, upcomingList : [...this.state.upcomingList, ...fetchData]})
      })
      .catch(e => console.log(e));
    }catch(e){
      return e;
    }
    this.setState({isLoading: false});
  };

  infiniteScroll(){
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if(scrollHeight === (clientHeight + scrollTop)){
      const {page, total_pages} = this.state;
      if(page <= total_pages){
        this.getupComingList(page + 1);
      }
    }
  }

  render() {

    const { page, total_pages, upcomingList, isLoading } = this.state;

    return (
      <div>
        <div className="movie_header">
          <h2>Upcoming</h2>
          <input className="searching" placeholder="Searching" />
        </div>
        <GetEachMovie upcomingList={upcomingList} isLoading={isLoading} />
      </div>
    );
  }
}


function GetEachMovie({ upcomingList, isLoading }) {

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
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default Upcoming;
