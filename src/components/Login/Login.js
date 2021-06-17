import React, { useEffect, Fragment, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";

import { localbrandsApis } from "../../apis/localbrands";
import { API_SUCCSES, JWT_TOKEN } from "../../constants";

const Login = (props) => {
  //set page title
  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setLoginError(false);
    // api goes here
    login(username, password);
  };

  const login = async (username, password) => {
    try {
      const res = await localbrandsApis.login(username, password);

      if (res.status === API_SUCCSES) {
        localStorage.setItem(JWT_TOKEN, res.data.token);
        props.history.push("/main-page");
      }
    } catch (err) {
      setLoginError(true);
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
            <p class="text-center">Or Login with</p>
            <p class="text-center">
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
