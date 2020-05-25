import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Upcoming from "./routes/Upcoming";
import Movie from "./routes/Movie";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./routes/common.css";
import "./components/MovieList.css";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div className="react-contatiner">
        <Header />
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/upcoming" component={Upcoming}></Route>
        <Route path="/movie" component={Movie}></Route>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
