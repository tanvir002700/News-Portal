import React, { useReducer } from 'react';
import { UserContext } from './context';

const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = isBrowser && (JSON.parse(localStorage.getItem('user')) || {});

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ME':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload
      };
    case 'DELETE_ME':
      localStorage.removeItem('user');
      return {};
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
