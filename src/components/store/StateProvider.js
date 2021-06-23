import React, { useReducer } from "react";
import AppContext from "./app-context";

const initialState = {
  localbrand: null,
};

const appReducer = (state, action) => {
  if (action.type === "LOGIN") {
    const updatedLocalbrand = action.localbrand;
    return {
      ...state,
      localbrand: updatedLocalbrand,
    };
  }
  // switch (action.type) {
  //   case "LOGIN":
  //     currentState.localbrand = action.payload;
  //     return currentState;
  //   case "LOGOUT":
  //     currentState.localbrand = null;
  //     return currentState;
  //   default:
  //     throw new Error();
  // }
  return initialState;
};

const StateProvider = ({ children }) => {
  const [appState, dispatchAppAction] = useReducer(appReducer, initialState);

  const loginHandler = (localbrand) => {
    dispatchAppAction({ type: "LOGIN", localbrand: localbrand });
  };

  const appContext = {
    localbrand: appState.localbrand,
    login: loginHandler,
  };
  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default StateProvider;
