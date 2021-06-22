import React, { useReducer } from "react";
import AppContext from './app-context';

const initialState = {
  localbrand: null,
  products: [],
};

const appReducer = (state, action) => {
  
  if (action.type === 'LOGIN') {
    const updatedLocalbrand = action.localbrand;
    return {
      ...state,
      updatedLocalbrand
    }
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

  const addProductHandler = product => {
    dispatchAppAction({ type: 'ADD_PRODUCT', product: product });
  };

  const deleteProductHandler = id => {
    dispatchAppAction({ type: 'DELETE_PRODUCT', localbrand: id });
  };
  
  const updateProductHandler = product => {
    dispatchAppAction({ type: 'UPDATE_PRODUCT', localbrand: product });
  };

  const updateOrderHandler = order => {
    dispatchAppAction({ type: 'UPDATE_ORDER', localbrand: order });
  };

  const loginHandler = localbrand => {
    dispatchAppAction({ type: 'LOGIN', localbrand: localbrand });
  }

  const appContext = {
    localbrand: appState.localbrand,
    products: appState.products,
    addProduct: addProductHandler,
    deleteProduct: deleteProductHandler,
    updateProduct: updateProductHandler,
    updateOrder: updateOrderHandler,
    login: loginHandler,
  }
  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};

export default StateProvider;
