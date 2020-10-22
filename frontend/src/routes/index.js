import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import LoginView from '../container/auth/LoginView';
import RegistrationView from '../container/auth/RegistraionView'
import Dashboard from '../container/Dashboard';
import AuthTemplate from '../templates/AuthTemplate';
import LoggedInUserTemplate from '../templates/LoggedInUserTemplate';


const Routes = props => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} Template={LoggedInUserTemplate}/>
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
