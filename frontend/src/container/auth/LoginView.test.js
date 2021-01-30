import React from 'react';
import { cleanup, render, fireEvent, waitFor, screen } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';
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

describe("form validation", () => {
  test("should call backend api with proper input", async () => {
    render(<LoginView/>);

    const emailInput = screen.queryByTestId('email-field').querySelector('input');
    const passwordInput = screen.queryByTestId('password-field').querySelector('input');
    const submitButton = screen.queryByTestId('submit');

    userEvent.type(emailInput, 'test@email.com');
    userEvent.type(passwordInput, 'test');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPostRequest).toHaveBeenCalled();
    });
  });

  test("should not call backend api with blank email field", async () => {
    render(<LoginView/>);

    const emailInput = screen.queryByTestId('email-field').querySelector('input');
    const passwordInput = screen.queryByTestId('password-field').querySelector('input');
    const submitButton = screen.queryByTestId('submit');

    userEvent.type(passwordInput, 'test');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPostRequest).not.toHaveBeenCalled();
    });
  });

  test("should not call backend api with invalid email", async () => {
    render(<LoginView/>);

    const emailInput = screen.queryByTestId('email-field').querySelector('input');
    const passwordInput = screen.queryByTestId('password-field').querySelector('input');
    const submitButton = screen.queryByTestId('submit');

    userEvent.type(emailInput, 'testemail.com');
    userEvent.type(passwordInput, 'test');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPostRequest).not.toHaveBeenCalled();
    });
  });

  test("should not call backend api with blank password", async () => {
    render(<LoginView/>);

    const emailInput = screen.queryByTestId('email-field').querySelector('input');
    const passwordInput = screen.queryByTestId('password-field').querySelector('input');
    const submitButton = screen.queryByTestId('submit');

    userEvent.type(emailInput, 'test@email.com');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPostRequest).not.toHaveBeenCalled();
    });
  });
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
      non_field_errors: ["Unable to log in with provided credentials."]
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
    expect(screen.getByText("Unable to log in with provided credentials.")).toBeTruthy();
    expect(mockHistoryPush).not.toHaveBeenCalledWith('/');
  });
});
