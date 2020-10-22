import React, { useState } from 'react';
import useFetch from 'use-http';
import { useHistory, Link } from "react-router-dom";
import { TextField, Button, Grid, Typography } from '@material-ui/core';


const RegistrationView = props => {
  const [errors, setErrors] = useState({});
  const [registerRequest, registerResponse] = useFetch('/api/users/');
  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    const { email, password, re_password } = e.target.elements;
    const data = {
      email: email.value,
      password: password.value,
      re_password: re_password.value
    };

    const res = await registerRequest.post('/', data);

    if(registerResponse.ok) {
      setErrors({});
      history.push('/login');
    } else {
      setErrors(res);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit} data-testid='registration-form'>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <Typography variant="h4" gutterBottom>Registration</Typography>
            </Grid>
            <Grid container alignItems="center" justify="center">
              {errors.non_field_errors &&
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
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              data-testid="re-password-field"
              id="re-password-field"
              label="Password Confirm"
              type="password"
              defaultValue=""
              variant="outlined"
              required
              fullWidth
              margin="dense"
              name="re_password"
              error={!!errors.re_password}
              helperText={errors.re_password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              data-testid="submit"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth>
                Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" justify="center">
              <Link to="/login">Login to site</Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default RegistrationView;
