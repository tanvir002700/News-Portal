import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import LoginView from './LoginView';


test('render login form properly', () => {
  const { queryByTestId, getByText } = render(
    <BrowserRouter>
      <LoginView/>
    </BrowserRouter>
  );
  expect(queryByTestId('email-field')).toBeTruthy();
  expect(queryByTestId('password-field')).toBeTruthy();
  expect(queryByTestId('submit')).toBeTruthy();
  expect(getByText(/Registration/i)).toBeInTheDocument();
});
