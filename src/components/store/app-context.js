import React from 'react';

const AppContext = React.createContext({
    localbrand: null,
    products: [],
    addProduct: (product) => { },
    deleteProduct: (id) => { },
    updateProduct: (product) => { },
    updateOrder: (order) => { },
    login: (localbrand) => {},
});

export default AppContext;