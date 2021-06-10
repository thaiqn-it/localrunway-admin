import React, { useEffect, Fragment, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";

const Login = (props) => {
  //set page title
  useEffect(() => {
    document.title = "Login Page";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // api goes here
  };

  return (
    <Fragment>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3>Sign In</h3>

            <div className="form-group h-100">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={emailChangeHandler}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={passwordChangeHandler}
              />
            </div>

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
