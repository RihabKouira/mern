import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ChatPage from "../../pages/ChatPage";
import Chat_Page from "../../pages/Chat_page";

import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import NavBar from "../NavBar";
const index = () => {
  return (
    <div>
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Route path="/trending" exact component={Trending} />
          <Route path="/chat" exact component={ChatPage} />
          <Route path="/chat_page" exact component={Chat_Page} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default index;
