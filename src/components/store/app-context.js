import React from "react";

const AppContext = React.createContext({
  localbrand: null,
  login: (localbrand) => {},
});

export default AppContext;
