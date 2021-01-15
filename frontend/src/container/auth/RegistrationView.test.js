import React from 'react';
import { render, fireEvent } from 'utils/test-utils';
import RegistrationView from './RegistraionView';


test('render registration form properly', () => {
  const { queryByTestId, getByText } = render(<RegistrationView/>);
  expect(queryByTestId('email-field')).toBeTruthy();
  expect(queryByTestId('password-field')).toBeTruthy();
  expect(queryByTestId('re-password-field')).toBeTruthy();
  expect(queryByTestId('submit')).toBeTruthy();
  expect(getByText(/Login to site/i)).toBeTruthy();
});
