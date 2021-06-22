import React, { useReducer } from "react";

const initialState = {
  localbrand: null,
};
export const context = React.createContext(initialState);

const { Provider } = context;

const reducer = (state, action) => {
  const currentState = { ...state };
  switch (action.type) {
    case "LOGIN":
      currentState.localbrand = action.payload;
      return currentState;
    case "LOGOUT":
      currentState.localbrand = null;
      return currentState;
    default:
      throw new Error();
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default StateProvider;
