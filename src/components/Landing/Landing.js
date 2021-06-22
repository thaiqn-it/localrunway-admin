import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { authService } from "../../service/auth";
import ListProduct from "../Product/ListProduct";
import Sidebar from "../Sidebar/Sidebar";
import "./Landing.css";

const Landing = (props) => {
  const logOut = () => {
    authService.logout();
    props.history.push("/sign-in");
  };

  let { path, url } = useRouteMatch();
  return (
    <>
      <div className="landing-wrapper">
        <div className="side-nav-bar">
          <Sidebar />
        </div>
        <div className="main-landing">
          <Switch>
            <Route exact path={url} component={ListProduct}></Route>
            <Route path={"/main-page/products"} component={ListProduct}></Route>
            <Route></Route>
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Landing;
