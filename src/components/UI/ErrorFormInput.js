import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

const ErrorFormInput = (props) => {
  return <div className="alert alert-danger mt-2">{props.error}</div>;
};

export default ErrorFormInput;
