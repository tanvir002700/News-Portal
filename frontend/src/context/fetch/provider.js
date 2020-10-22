import React, { useContext } from 'react';
import { Provider } from 'use-http';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../auth/context';


const FetchProvider = ({children}) => {
  const history = useHistory();

  const { authState, authDispatch } = useContext(AuthContext);
  let headers = {
    "Content-Type": "application/json",
  };

  if (authState.token) {
    headers['Authorization'] = `Token ${authState.token}`;
  }

  const options = {
    cachePolicy: 'no-cache',
    headers,
    interceptors: {
      response: async ({ response }) => {
        if (response.status === 401 || response.status === 403) {
          authDispatch({type: 'SIGN_OUT'});
          history.push('/login');
        }
        if (response.status === 404) {
          //history.push(urls.NOT_FOUND_PAGE_URL);
        }
        if (response.status >= 500) {
          //error broker
        }
        return response;
      },
    },
  };

  return <Provider options={options}>{children}</Provider>;
};

export default FetchProvider;
