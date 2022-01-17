import './App.css';
import MyNavbar from './MyNavbar'
import {useState} from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import React from "react";

import Home from "./Home.js";
import Search from "./Search.js";

function App(props) {
   const [recentlyViewed, setrecentlyViewed] = useState([]);

   const addRecentlyViewed = (id) => {
      if (!recentlyViewed.includes(id)) {
         recentlyViewed.push(id)
      }
      setrecentlyViewed([...recentlyViewed]);
   }
  return (
    <div className="App">
    <MyNavbar recentlyViewed={recentlyViewed}></MyNavbar>
    <Switch>
       <Route exact path="/city/:updateSearchId" children={
       <Search  addRecentlyViewed={addRecentlyViewed}/>
       }></Route>
       <Route exact path="/id/:id" children={
       <weatherDetail/>
       }></Route>
       <Route exact path="/" children={
       <Home />
       }/>
       <Route render={() =>
       (
       <h1>Page Not Found. Please enter correct URL</h1>
       )} />
    </Switch>
 </div>
  );
}

export default App;
