import React, { useContext, useState } from 'react';
import useFetch from 'use-http';
import { useHistory, Link } from "react-router-dom";
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { AuthContext } from '../../context/auth/context';



const LoginView = props => {
  const [errors, setErrors] = useState({});
  const { authDispatch } = useContext(AuthContext);
  const [loginRequest, loginResponse] = useFetch('/api/auth/login');
  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const data = {email: email.value, password: password.value};
    const res = await loginRequest.post('/', data);
    if(loginResponse.ok) {
      authDispatch({type: 'SIGNIN_SUCCESS', payload: res.auth_token});
      setErrors({});
      history.push('/');
    } else {
      setErrors(res);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit} data-testid='login-form'>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <Typography variant="h4" gutterBottom>Login</Typography>
            </Grid>
            <Grid container alignItems="center" justify="center">
              {(errors && errors.non_field_errors) &&
              <Typography gutterBottom color="error">{errors.non_field_errors}</Typography> }
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              data-testid="email-field"
              id="email-field"
              label="Email"
              type="email"
              defaultValue=""
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              data-testid="password-field"
              id="password-field"
              label="Password"
              type="password"
              defaultValue=""
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              data-testid="submit"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
                Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <Link to="/registration">Registration</Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default LoginView;
