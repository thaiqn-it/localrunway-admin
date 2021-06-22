import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/jquery/dist/jquery.min.js";

import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./components/FontawesomeIcons/index";
import Login from "./components/Login/Login";
import Landing from "./components/Landing/Landing";
import StateProvider from "./components/store/StateProvider";

function App() {
  return (
    <StateProvider>
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                LocalRunway
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/main-page" component={Landing} />
          </Switch>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
