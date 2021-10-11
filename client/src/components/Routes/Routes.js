import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../Navigation/Header";
import AuthRoute from "./AuthRoute";
import AuthForm from "../../pages/AuthForm";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trends from "../../pages/Trends";
import Message from "../../pages/Message";
import Notification from "../../pages/Notification";

function Routes() {
  return (
    <div>
      <Router>
        <div className="h-screen w-screen bg-gray-100 overflow-hidden">
          <Header />
          <main className="flex">
            <Switch>
              <AuthRoute path="/" exact component={AuthForm} />
              <Route path="/home" exact component={Home} />
              <Route path="/profil" exact component={Profil} />
              <Route path="/trends" exact component={Trends} />
              <Route path="/message" exact component={Message} />
              <Route path="/notification" exact component={Notification} />
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default Routes;
