import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { JWT_TOKEN } from "../../constants";
import ListProduct from "../Product/ListProduct";
import ProductDetail from "../Product/ProductDetail.js";
import "./Landing.css";

const Landing = (props) => {
  const [productId, setProductId] = useState();
  const history = useHistory();
  let { path, url } = useRouteMatch();

  const getProductId = (id) => {
    setProductId(id);
    console.log(productId);
  };

  const checkIsLoggedIn = () => {
    if (localStorage.getItem(JWT_TOKEN) === null) {
      console.log("CHECK STORAGE");
      history.push("/login");
    }
  };

  useEffect(() => checkIsLoggedIn(), [props.isLoggedIn]);

  return (
    <div className="landing-wrapper">
      <div className="side-nav-bar shadow-lg bg-white">
        <div className="nav-wrapper">
          <Link className="nav-link" to={`${url}/products`}>
            Products
          </Link>
          <Link className="nav-link" to={`${url}/orders`}>
            Orders
          </Link>
        </div>
      </div>

      <div className="main-landing">
        <Switch>
          <Route
            exact
            path={"/home"}
            component={() => <ListProduct onGetProductId={getProductId} />}
          />
          <Route
            path={`${path}/products`}
            component={() => <ListProduct onGetProductId={getProductId} />}
          />
          <Route
            path={`${path}/productDetail`}
            component={() => <ProductDetail id={productId} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Landing;
