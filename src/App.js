import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./routes/Home";
import Upcoming from "./routes/Upcoming";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Header />
      <Route path="/" exact={true} component={Home}></Route>
      <Route path="/upcoming" component={Upcoming}></Route>
      <Footer />
    </HashRouter>
  );
}

export default App;
