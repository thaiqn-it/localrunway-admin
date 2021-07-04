import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

const ErrorFormInput = (props) => {
  return <div className="alert alert-danger mt-2 col-6">{props.errorMsg}</div>;
};

export default ErrorFormInput;
