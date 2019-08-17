import React from 'react';

export const StateContext = React.createContext();
export const useStateValue = () => React.useContext(StateContext);

const Store = ({reducer, initialState, children}) => (
  <StateContext.Provider value={ React.useReducer(reducer, initialState) }>
    {children}
  </StateContext.Provider>
);

export default Store;
