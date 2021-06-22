import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { authService } from "../../service/auth";
import ListProduct from "../Product/ListProduct";
import Sidebar from "../Sidebar/Sidebar";
import "./Landing.css";

const Landing = (props) => {
  const logOut = () => {
    authService.logout();
    props.history.push("/sign-in");
  };
  return (
    <Router>
      <div className="landing-wrapper">
        <div className="side-nav-bar shadow-lg bg-white">
          <Sidebar />
        </div>

        <div className="main-landing">
          <Switch>
            <Route path={"/main-page/"} component={ListProduct}></Route>
            <Route path={"/main-page/products"} component={ListProduct}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Landing;
