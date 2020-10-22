import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import useFetch from 'use-http';
import { AuthContext } from '../context/auth/context';
import { UserContext } from '../context/user/context';


const PrivateRoute = props => {
  const { component: Component, path, Template, ...rest } = props;
  const { authState } = useContext(AuthContext);
  const { userDispatch } = useContext(UserContext);
  const {isAuthenticated} = authState;
  const [meRequest, meResponse] = useFetch('api/users/me');

  const fetchMe = async () => {
    const res = await meRequest.get();
    if(meResponse.ok) {
      userDispatch({type: 'UPDATE_ME', payload: res});
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMe();
    }
  }, [isAuthenticated]); // eslint-disable-line

  const getPrivateView = componentProps =>
    !Template ? (
      <Component {...componentProps} />
    ) : (
      <Template {...componentProps}>
        <Component {...componentProps} />
      </Template>
    );

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          getPrivateView(props)
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

export default PrivateRoute;

