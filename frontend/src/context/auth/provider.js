import React, { useReducer } from 'react';
import { AuthContext } from './context';

const isBrowser = typeof window !== 'undefined';
const INITIAL_STATE = {
  isAuthenticated: isBrowser && !!localStorage.getItem('access_token'),
  token: isBrowser && localStorage.getItem('access_token'),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      localStorage.setItem('access_token', `${action.payload}`);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case 'SIGN_OUT':
      delete localStorage['access_token'];
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };
    default:
      return state;
  }
}

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
