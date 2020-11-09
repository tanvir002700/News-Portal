import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from '../../context/auth/provider';
import LoginView from './LoginView';
import useFetch from 'use-http';

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('use-http');

test('render login form properly', () => {
  useFetch.mockReturnValue([]);
  const { queryByTestId, getByText } = render(
    <BrowserRouter>
      <LoginView/>
    </BrowserRouter>
  );
  expect(queryByTestId('email-field')).toBeTruthy();
  expect(queryByTestId('password-field')).toBeTruthy();
  expect(queryByTestId('submit')).toBeTruthy();
  expect(getByText(/Registration/i)).toBeTruthy();
});

test('login', async () => {
  useFetch.mockReturnValue([
    {
      post: jest.fn().mockResolvedValueOnce({
        auth_token: 'xyz'
      })
    },
    {
      ok: true
    }
  ]);
  const { queryByTestId, getByText, getByLabelText } = render(
    <BrowserRouter>
      <AuthProvider>
        <LoginView/>
      </AuthProvider>
    </BrowserRouter>
  );
  const emailInput = queryByTestId('email-field').querySelector('input');
  const passwordInput = queryByTestId('password-field').querySelector('input');
  const submitButton = queryByTestId('submit');
  fireEvent.change(emailInput, {target: {value: 'test@email.com'}});
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
