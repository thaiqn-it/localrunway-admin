import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListProduct from "../Product/ListProduct";
import ProductDetail from "../Product/ProductDetail.js";
import Sidebar from "../Sidebar/Sidebar";
import "./Landing.css";
import { useHistory } from "react-router-dom";
import AppContext from "../store/app-context";

const Landing = (props) => {
  const [productId, setProductId] = useState();
  const history = useHistory();
  const appCtx = useContext(AppContext);

  //check loggedId
  useEffect(() => {
    if (!appCtx.localbrand) {
      history.push("/");
    }
  }, [appCtx.localbrand]);

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
