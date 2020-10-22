import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, InputAdornment, Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
}));


const Dashboard = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="TextField"
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        data-testid="submit"
        type="submit"
        variant="contained"
        color="primary">
          Search
      </Button>
    </React.Fragment>
  );
};

export default Dashboard;
