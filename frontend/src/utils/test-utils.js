import React from 'react';
import { render } from '@testing-library/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from '../context/auth/provider';
import FetchProvider from '../context/fetch/provider';
import UserProvider from '../context/user/provider';
import theme from '../setupTheme';

const AllTheProviders = ({ children }) => {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <AuthProvider>
            <UserProvider>
              <FetchProvider>
                <BrowserRouter>
                  {children}
                </BrowserRouter>
              </FetchProvider>
            </UserProvider>
          </AuthProvider>
        </SnackbarProvider>
      </MuiThemeProvider>
    </React.Fragment>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
