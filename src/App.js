import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/jquery/dist/jquery.min.js";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./components/FontawesomeIcons/index";
import Login from "./components/Login/Login";
import Landing from "./components/Landing/Landing";
import StateProvider from "./components/store/StateProvider";
import { JWT_TOKEN } from "./constants";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logInHandler = () => {
    if (localStorage.getItem(JWT_TOKEN)) {
      setIsLoggedIn(true);
      console.log("LOG IN!");
    }
  };

  const logouHandler = () => {
    localStorage.removeItem(JWT_TOKEN);
    localStorage.clear();
    setIsLoggedIn(false);
  };

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
                {!isLoggedIn && (
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
                )}

                {isLoggedIn && (
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/sign-in"}>
                        <button onClick={logouHandler}>Log out</button>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </nav>

          <Switch>
            <Route
              exact
              path="/"
              component={() => <Login onLogin={logInHandler} />}
            />
            <Route
              path="/sign-in"
              component={() => <Login onLogin={logInHandler} />}
            />
            <Route path="/main-page" component={Landing} />
          </Switch>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
