import React from "react";
import "./App.css";
import {  Switch, Route } from "react-router-dom";
import Search from "./components/Search/Search";
import Details from "./components/Details/Details";
import Results from "./components/Results/Results";
function App() {
  return (
    <>
      <Search />
      <Switch>
        <Route exact path="/items" component={Results} />
        <Route exact path="/items/:id" component={Details} />
      </Switch>
    </>
  );
}

export default App;
