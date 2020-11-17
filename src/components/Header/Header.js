import React  from "react";
import { Link, useHistory } from "react-router-dom";
import {FaList} from "react-icons/fa";

class Header extends React.Component{

  constructor(props){
    super(props);
    this.menu = React.createRef();
  }

  showMenu = () => {
    if(this.menu.current.style.display === "block"){
      this.menu.current.style.display = "none";
    }
    else{
      this.menu.current.style.display = "block";
    }
  }

  render(){
    return(
    <div className="header">
      <FaList id="header_menu" onClick={this.showMenu}/>
      <nav className="submenu">
       <ul  ref={this.menu}>
         <Link to="/nowplaying" style={{ textDecoration: 'none' }}>
           <li>Now Playing</li>
          </Link>
          <Link to="/upcoming" style={{ textDecoration: 'none' }}>
           <li>Upcoming</li>
          </Link>
          <Link to="/toprated" style={{ textDecoration: 'none' }}>
           <li>Top Rated</li>
          </Link>
          <Link to="/mynote" style={{ textDecoration: 'none' }}>
           <li>My Note</li>
          </Link>
        </ul>
      </nav>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1>Movie Note.</h1>
      </Link>
      <div className="userinfo">
        {this.props.isLogin ? <button onClick={this.props.onLogOut}>Logout</button> : <Link to="/login" style={{ textDecoration: 'none' }}><button>Login</button></Link>}
      </div>
    </div>
 );}
}

export default Header;
