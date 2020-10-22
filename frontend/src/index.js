import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AuthProvider from './context/auth/provider';
import FetchProvider from './context/fetch/provider';
import UserProvider from './context/user/provider';
import theme from './setupTheme';
import Routes from './routes';

const App = props => {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <AuthProvider>
          <UserProvider>
            <FetchProvider>
              <Routes/>
            </FetchProvider>
          </UserProvider>
        </AuthProvider>
      </MuiThemeProvider>
    </React.Fragment>
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
