import React, { Fragment, useState, useContext, useLayoutEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";

import { API_SUCCSES, JWT_TOKEN } from "../../constants";
import { authService } from "../../service/auth";
import AppContext from "../store/app-context";
import { localbrandsApis } from "../../apis/localbrands";
import Landing from "../Landing/Landing";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  //set page title
  useLayoutEffect(() => {
    document.title = "Login Page";
  }, []);

  const appCtx = useContext(AppContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [authError, setAuthError] = useState(false);

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLoginError(false);
    setAuthError(false);
    // api goes here
    login(username, password);
  };

  const login = async (username, password) => {
    try {
      const res = await authService.login(username, password);

      if (res.status === API_SUCCSES) {
        console.log(res.data.token);
        localStorage.setItem(JWT_TOKEN, res.data.token);
        await authUser(res.data.token);
      }
    } catch (err) {
      setLoginError(true);
    }
  };

  const authUser = async () => {
    try {
      const res = await localbrandsApis.getAuthInfo();
      console.log(res.data);
      if (res.status === API_SUCCSES) {
        console.log("GET USER SUCCESS");
        props.onLogin();
        const localbrand = res.data;
        appCtx.login(localbrand);
        history.push("/main-page");
      }
    } catch (err) {
      console.log("Auth Error");
    }
  };

  return (
    <Fragment>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>

            <div className="form-group h-100">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                value={username}
                onChange={usernameChangeHandler}
              />
            </div>

            <div className="form-group ">
              <label>Password</label>
              <input
                id="validationPassword"
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={passwordChangeHandler}
              />
            </div>
            {loginError ? (
              <div className="alert alert-danger mt-2">
                Invalid username and/or password please try again
              </div>
            ) : (
              ""
            )}
            {authError ? (
              <div className="alert alert-danger mt-2">
                Server Error please try again
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block submit-button"
              onClick={onSubmitHandler}
            >
              Submit
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
            <p className="text-center">Or Login with</p>
            <p className="text-center">
              <FontAwesomeIcon
                className="login-icon"
                icon={["fab", "facebook"]}
              />
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
