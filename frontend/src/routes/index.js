import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import AuthTemplate from '../templates/AuthTemplate';
import LoggedInUserTemplate from '../templates/LoggedInUserTemplate';
import LoginView from '../container/auth/LoginView';
import RegistrationView from '../container/auth/RegistraionView'
import Dashboard from '../container/Dashboard';
import Profile from '../container/Profile';


const Routes = props => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} Template={LoggedInUserTemplate}/>
        <PrivateRoute exact path='/profile' component={Profile} Template={LoggedInUserTemplate}/>
        <Route path='/login' exact={true}>
          <AuthTemplate>
            <LoginView/>
          </AuthTemplate>
        </Route>

        <Route path='/registration' exact={true}>
          <AuthTemplate>
            <RegistrationView/>
          </AuthTemplate>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
