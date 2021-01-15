import React from 'react';
import { cleanup, render, fireEvent, waitFor, screen } from 'utils/test-utils';
import LoginView from './LoginView';


const mockHistoryPush = jest.fn();
const mockPostRequest = jest.fn();
const mockRequestOk = jest.fn(() => false);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('use-http', () => ({
  ...jest.requireActual('use-http'),
  useFetch: () => ([{
    post: mockPostRequest
  }, {
    ok: mockRequestOk()
  }])
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

test('render login form properly', () => {
  render(<LoginView/>);
  expect(screen.queryByTestId('email-field')).toBeTruthy();
  expect(screen.queryByTestId('password-field')).toBeTruthy();
  expect(screen.queryByTestId('submit')).toBeTruthy();
  expect(screen.getByText(/Registration/i)).toBeTruthy();
});

describe('login', () => {
  test('success', async () => {
    mockPostRequest.mockResolvedValueOnce({
      auth_token: 'xyz'
    })
    mockRequestOk.mockReturnValue(true);

    render(<LoginView/>);

    const emailInput = screen.queryByTestId('email-field').querySelector('input');
    const passwordInput = screen.queryByTestId('password-field').querySelector('input');
    const submitButton = screen.queryByTestId('submit');

    fireEvent.change(emailInput, {target: {value: 'test@email.com'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    fireEvent.click(submitButton);

    const data = { email: 'test@email.com', password: 'password' };
    await waitFor(() => {
      expect(mockPostRequest).toHaveBeenCalledWith('/', data);
    });
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  test('failed', async () => {
    mockPostRequest.mockResolvedValueOnce({
      auth_token: 'xyz'
    })
    mockRequestOk.mockReturnValue(false);

    render(<LoginView/>);

    const emailInput = screen.queryByTestId('email-field').querySelector('input');
    const passwordInput = screen.queryByTestId('password-field').querySelector('input');
    const submitButton = screen.queryByTestId('submit');

    fireEvent.change(emailInput, {target: {value: 'test@email.com'}});
    fireEvent.change(passwordInput, {target: {value: 'password'}});
    fireEvent.click(submitButton);

    const data = { email: 'test@email.com', password: 'password' };
    await waitFor(() => {
      expect(mockPostRequest).toHaveBeenCalledWith('/', data);
    });
    expect(mockHistoryPush).not.toHaveBeenCalledWith('/');
  });
});
