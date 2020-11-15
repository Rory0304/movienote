import React from "react";
import Axios from "axios";
import {commonAPI, secretKey} from "../../variable";
import PersonIcon from "../../assets/icons8-person-90.png";
import "./MyNote.css";

class MyNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists : [
        {
          index : 1,
          movie_id : 531219,
          date : "2020.02.02",
          contents : "앤해서웨이 좋아."
        },
        {
          index: 2,
          movie_id : 671,
          date : "2020.03.02",
          contents : "해리포터는 첫편이 최고에요."
        },
        {
          index: 3,
          movie_id : 16081,
          date : "2020.04.02",
          contents : "동물들이 귀여움."
        }
      ]
    };
    this.setMovieTitle = this.setMovieTitle.bind(this);
  }

  componentDidMount() {
    this.state.lists.map((list, index) => {
      this.setMovieTitle(list, index);
    })
  }

  setMovieTitle = async(list, index) => {
    const movie_url = `${commonAPI}${list.movie_id}?api_key=${secretKey}`;
    await Axios.get(movie_url).then(res => {
      let newValue = {...this.state.lists[index], title : res.data.title, poster : res.data.poster_path};
      let newList = this.state.lists; //lists 전체를 새로운 변수 newList에 선언
      newList[index] = newValue; //newList의 index에 해당하는 list를 title이 추가된 newValue로 변경
      this.setState({
        newList //lists 전체를 업데이트
      })
    })
  }

 render(){
    return (
      <div>
        <div className="note_header">
          <img src={PersonIcon} alt="PersonIcon" />
          <h2>user</h2>
          <input className="searching" placeholder="Searching" />
        </div>
        <div className="notes">
         {this.state.lists.map((list) => (
           <div className="note">
            <h3>{list.date}</h3>
            <img src={"http://image.tmdb.org/t/p/w185" + list.poster} />
            <div className="note_text">
              <h4>{list.title}</h4>
              <p>{list.contents}</p>
            </div>
           </div>
         ))}
        </div>
      </div>
    );
  }
}

export default MyNote;
