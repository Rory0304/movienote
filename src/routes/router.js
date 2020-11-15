import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import PropTypes from "prop-types";
import Home from "../components/Home/Home";
import MyNote from "../components/MyNote/Mynote";
import Upcoming from "../components/MovieList/Upcoming/Upcoming";
import NowPlaying from "../components/MovieList/NowPlaying/NowPlaying";
import Movie from "../components/Movie/Movie";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../components/Login/Login";
import "../components/common.css";

class Router extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLogin : false,
      onLogOut : this.onLogOut,
      onLogin : this.onLogin
    }
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount(){
    const id = window.sessionStorage.getItem("id");
    if(id){
      this.onLogin();
    }
    else{
      this.onLogOut();
    }
  }

  onLogin = () => {
    this.setState({isLogin : true});
  }

  onLogOut = () => {
    this.setState({isLogin : false});
    window.sessionStorage.removeItem("id");
    window.sessionStorage.removeItem("pw");
  }

  render(){
    const { isLogin, onLogOut, onLogin} = this.state;
    return (
    <BrowserRouter>
      <>
      <Header isLogin={isLogin} onLogOut={onLogOut}/>
        <Switch>
          <Route path="/" exact={true}><Home/></Route>
          <Route path="/upcoming" exact={true}><Upcoming/></Route>
          <Route path="/nowplaying" exact={true}><NowPlaying/></Route>
          <Route path="/mynote" exact={true}><MyNote/></Route>
          <Route path="/movie" component={Movie}></Route>
          <Route path="/login" component={Login} onLogin={onLogin}></Route>

        </Switch>
      <Footer />
      </>
    </BrowserRouter>
  );
  }

}

Router.propTypes = {
  onLogin : PropTypes.func
};

export default Router;
