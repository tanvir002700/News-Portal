import React from 'react';
import { render, fireEvent, waitFor } from 'test-utils';
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

test('render login form properly', () => {
  const { queryByTestId, getByText } = render(<LoginView/>);
  expect(queryByTestId('email-field')).toBeTruthy();
  expect(queryByTestId('password-field')).toBeTruthy();
  expect(queryByTestId('submit')).toBeTruthy();
  expect(getByText(/Registration/i)).toBeTruthy();
});

describe('login', () => {
  test('success', async () => {
    mockPostRequest.mockResolvedValueOnce({
      auth_token: 'xyz'
    })
    mockRequestOk.mockReturnValue(true);
    const { queryByTestId, getByText, getByLabelText } = render(<LoginView/>);
    const emailInput = queryByTestId('email-field').querySelector('input');
    const passwordInput = queryByTestId('password-field').querySelector('input');
    const submitButton = queryByTestId('submit');
    fireEvent.change(emailInput, {target: {value: 'test@email.com'}});
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  test('failed', async () => {
    mockPostRequest.mockResolvedValueOnce({
      auth_token: 'xyz'
    })
    mockRequestOk.mockReturnValue(true);
    const { queryByTestId, getByText, getByLabelText } = render(<LoginView/>);
    const emailInput = queryByTestId('email-field').querySelector('input');
    const passwordInput = queryByTestId('password-field').querySelector('input');
    const submitButton = queryByTestId('submit');
    fireEvent.change(emailInput, {target: {value: 'test@email.com'}});
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockHistoryPush).not.toHaveBeenCalledWith('/');
    });
  });
});
