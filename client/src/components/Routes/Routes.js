import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../Navigation/Header";
import AuthForm from "../../pages/AuthForm";
import Home from "../../pages/Home";
import AuthRoute from "./AuthRoute";

function Routes() {
  return (
    <div>
      <Router>
        <div className='h-screen w-screen bg-gray-100 overflow-hidden'>
          <Header />
          <main className='flex'>
            <Switch>
              <AuthRoute path='/' exact component={AuthForm} />
              <Route path='/home' exact component={Home} />
            </Switch>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default Routes;
