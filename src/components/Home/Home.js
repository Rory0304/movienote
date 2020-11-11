import React from "react";
import Axios from "axios";
import "./Home.css";
import {commonAPI, secretKey} from "../../variable";
import {FaChevronRight, FaChevronLeft} from "react-icons/fa";

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      popularList : [],
      upComingList : [],
      nowPlayingList : [],
      upComingCurrent : 0,
      nowPlayingCurrent : 0,
    }

    this.getPopularList = this.getPopularList.bind(this);
    this.getupComingList = this.getupComingList.bind(this);
    this.getNowplayingList = this.getNowplayingList.bind(this);
    
    this.totalSlides = 5;
    this.nowplayingTotalSlides = 3;
    this.upcomingCarousel = React.createRef();
    this.nowplayingCarousel = React.createRef();

  }

  componentDidMount(){
    this.getPopularList();
    this.getupComingList();
    this.getNowplayingList();
  }

  getPopularList = async() => {
    try{
      const popular_url = `${commonAPI}popular?api_key=${secretKey}&language=en-US&page=1`;
      await Axios.get(popular_url)
      .then(res => this.setState({popularList : res.data.results.slice(0,5)}))
      .catch(e => console.log(e));
    }
    catch(e){
      return e;
    }
  }

  getNowplayingList = async() => {
    try{
      const nowPlaying_url = `${commonAPI}now_playing?api_key=${secretKey}&language=en-US&page=1`;
      await Axios.get(nowPlaying_url)
      .then(res => this.setState({nowPlayingList : res.data.results.slice(0,12)}))
      .catch(e => console.log(e));
    }
    catch(e){
      return e;
    }
  }

  getupComingList = async() => {
    try{
      const upcoming_url = `${commonAPI}upcoming?api_key=${secretKey}&language=en-US&page=1`;
      await Axios.get(upcoming_url)
      .then(res => this.setState({upComingList : res.data.results.slice(0,5)}))
      .catch(e => console.log(e));
    }catch(e){
      return e;
    }
  };


  moveSlide = (props) => {


    if(props === "upcoming"){
      const size = this.upcomingCarousel.current.clientWidth;
      this.upcomingCarousel.current.style.transition = "transform 0.4s ease-in-out";
      this.upcomingCarousel.current.style.transform = "translateX(" + (-size * this.state.upComingCurrent) + "px)";
    }
    else{
      const size = this.nowplayingCarousel.current.clientWidth;
      this.nowplayingCarousel.current.style.transition = "transform 0.4s ease-in-out";
      this.nowplayingCarousel.current.style.transform = "translateX(" + (-size * this.state.nowPlayingCurrent) + "px)";
    }
    
  }


  clickPrevBtn_nowPlaying = (e) => {
    e.preventDefault();

    if(this.state.nowPlayingCurrent === 0){
      this.setState({nowPlayingCurrent : this.nowplayingTotalSlides-1}, function(){
        this.moveSlide("nowplaying");
      })
    }
    else{
      this.setState({nowPlayingCurrent : this.state.nowPlayingCurrent -1}, function(){
        this.moveSlide("nowplaying");
      })
    }
  }

  clickNextBtn_nowPlaying = (e) => {
    e.preventDefault();
    if(this.state.nowPlayingCurrent === this.nowplayingTotalSlides -1){
      this.setState({nowPlayingCurrent : 0}, function(){
        this.moveSlide("nowplaying");
      });
    }
    else{
      this.setState({nowPlayingCurrent : this.state.nowPlayingCurrent + 1},function(){
        this.moveSlide("nowplaying");
      });
    }
  }

  clickPrevBtn = (e) => {
    e.preventDefault();

     if(this.state.upComingCurrent === 0){
       this.setState({upComingCurrent : this.totalSlides -1}, function(){
         this.moveSlide("upcoming");
       });
     }
     else{
       this.setState({upComingCurrent : this.state.upComingCurrent -1}, function(){
         this.moveSlide("upcoming");
       });
     }
  }

  
  clickNextBtn = (e) => {
    e.preventDefault();
     if(this.state.upComingCurrent === this.totalSlides -1){
       this.setState({upComingCurrent : 0}, function(){
         this.moveSlide("upcoming");
       });
     }
     else{
       this.setState({upComingCurrent : this.state.upComingCurrent + 1},function(){
         this.moveSlide("upcoming");
       });
     }
  }

  render(){
    let popularList = this.state.popularList;
    let upComingList = this.state.upComingList;
    let nowPlayingList = this.state.nowPlayingList;
    
    return(
    <div>
      <div className="popular_area">
        {popularList.map((list) => <PopularArea list={list} key={list.id} />)}
      </div>
      <div className="nowplaying_area">
        <h2>Now Playing</h2>
        <FaChevronLeft className="arrow nowplaying_left" onClick={this.clickPrevBtn_nowPlaying}/>
        <div className="nowplaying_movies">
          <div className="nowplaying_movies_carousel"  ref={this.nowplayingCarousel}>
          {nowPlayingList.map((list) => <NowPlayingArea list={list} key={list.id}/>)}
          </div>
        </div>
        <FaChevronRight className="arrow nowplaying_right" onClick={this.clickNextBtn_nowPlaying}/>
        
      </div>
      <div className="upcoming_area">
        <h2>Upcoming</h2>
        <FaChevronLeft className="arrow upcoming_left" onClick={this.clickPrevBtn}/>
        <div className="upcoming_movies">
          <div className="upcoming_movies_carousel" ref={this.upcomingCarousel}>
          {upComingList.map((list, index) => <UpcomingArea list={list} key={list.id} index={index}/>)}
          </div>
        </div>
        <FaChevronRight className="arrow upcoming_right" onClick={this.clickNextBtn} />
      </div>
    </div>
    );
  }
}

function PopularArea({list}){
  const poster_path = "http://image.tmdb.org/t/p/w185" + list.poster_path;
  return(
    <div className="popular_movie">
      <img alt={list.title} src={poster_path}/>
      <h3>{list.title}</h3>
      <p>{list.release_date}</p>
      <p>{list.overview}</p>
      <div>See the movie</div>
    </div>
  )

}

function NowPlayingArea({list}){
  const poster_path = `url(http://image.tmdb.org/t/p/w185${list.poster_path})`;
  return(
  <div className="nowplaying_movie" style={{ backgroundImage: poster_path }} >
    <section className="nowplaying_movie_info">
      <h3>{list.title}</h3>
      <p>{list.release_date}</p> 
    </section>
  </div>
  )
}


class UpcomingArea extends React.Component{

  render(){
    const list = this.props.list;
    const index = this.props.index;
    const poster_path = "http://image.tmdb.org/t/p/w185" + list.poster_path;

    return(
    <div className="upcoming_movie">
      <img alt={list.title} src={poster_path}/>
      <section><h3>{list.title}</h3>
      <p>{list.release_date}</p>
      <p>{list.overview}</p></section>
    </div>
  );
  }
  
}

export default Home;
