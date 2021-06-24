import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListProduct from "../Product/ListProduct";
import ProductDetail from "../Product/ProductDetail.js";
import Sidebar from "../Sidebar/Sidebar";
import "./Landing.css";

const Landing = (props) => {
  // const logOut = () => {
  //   authService.logout();
  //   props.history.push("/sign-in");
  // };

  const [productId, setProductId] = useState();

  const getProductId = (id) => {
    setProductId(id);
  };
  return (
    <Router>
      <div className="landing-wrapper">
        <div className="side-nav-bar shadow-lg bg-white">
          <Sidebar />
        </div>

        <div className="main-landing">
          <Switch>
            <Route
              exact
              path={"/main-page/"}
              component={() => <ListProduct onGetProductId={getProductId} />}
            />
            <Route
              path={"/main-page/products"}
              component={() => <ListProduct onGetProductId={getProductId} />}
            />
            <Route
              path={"/main-page/productDetail"}
              component={() => <ProductDetail id={productId} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Landing;
