import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

const ServerError = (props) => {
  return (
    <div className="alert alert-danger mt-2 col-3">
      {props.errorMsg}
      <button onClick={props.onGoBack}>
        Click here to go back to List Products
      </button>
    </div>
  );
};

export default ServerError;
