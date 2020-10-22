import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh'
  },
  root: {
    padding: 10
  }
}));


const AuthTemplate = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container alignItems="center" className={classes.container}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={4}>
              <Card className={classes.root} raised>
                {props.children}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default AuthTemplate;
