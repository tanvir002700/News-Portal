import React, { useReducer } from 'react';
import { UserContext } from './context';

const INITIAL_STATE = {};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ME':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
