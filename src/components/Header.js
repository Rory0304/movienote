import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../assets/list-32.png";
function Header() {
  return (
    <div className="header">
      <img src={logo} alt="list-logo" id="header-logo" />
      <input className="searchbar" />
      <Link to="/home">
        <h1>Movie Note</h1>
      </Link>
      <div className="userinfo">
        <button>Login</button>
        <button>Sign up</button>
      </div>
      <nav className="submenu">
        <ul>
          <Link to="/>">
            <li>Now Playing</li>
          </Link>
          <Link to="/upcoming">
            <li>Upcoming</li>
          </Link>
          <Link to="/">
            <li>Popular</li>
          </Link>
          <Link to="/">
            <li>Top Rated</li>
          </Link>
          <Link to="/">
            <li>My Note</li>
          </Link>
          <Link to="/">
            <li>Article</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
