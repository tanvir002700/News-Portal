import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import RegistrationView from './RegistraionView';


test('render registration form properly', () => {
  const { queryByTestId, getByText } = render(
    <BrowserRouter>
      <RegistrationView/>
    </BrowserRouter>
  );
  expect(queryByTestId('email-field')).toBeTruthy();
  expect(queryByTestId('password-field')).toBeTruthy();
  expect(queryByTestId('re-password-field')).toBeTruthy();
  expect(queryByTestId('submit')).toBeTruthy();
  expect(getByText(/Login to site/i)).toBeInTheDocument();
});
