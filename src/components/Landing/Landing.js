import React from "react";
import { JWT_TOKEN } from "../../constants";

const Landing = (props) => {
  const logOut = () => {
    localStorage.removeItem(JWT_TOKEN);
    props.history.push("/sign-in");
  };
  return (
    <div>
      <p>HI! LOGIN SUCCESS</p>
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Landing;
