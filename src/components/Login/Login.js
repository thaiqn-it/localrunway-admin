import React, { Fragment, useState, useLayoutEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { API_SUCCSES, JWT_TOKEN } from "../../constants";
import { authService } from "../../service/auth";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  //set page title
  useLayoutEffect(() => {
    document.title = "Login Page";
  }, []);

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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoginError(false);
    setAuthError(false);
    // login
    await login(username, password);
  };

  const login = async (username, password) => {
    try {
      const res = await authService.login(username, password);
      if (res.status === API_SUCCSES) {
        console.log(res.data.token);
        localStorage.setItem(JWT_TOKEN, res.data.token);
        props.onLogin();
        history.push("/home");
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
            {authError ? (
              <div className="alert alert-danger mt-2">
                Server Error please try again
              </div>
            ) : (
              ""
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block submit-button"
              onClick={onSubmitHandler}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
