import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, InputAdornment, Button, Grid } from '@material-ui/core';
import useFetch from 'use-http';
import NewsCardView from './NewsCardView';


const useStyles = makeStyles((theme) => ({
}));


const Dashboard = props => {
  const classes = useStyles();

  const {get: fetchNews, data: news, errors, loading} = useFetch('/api/news-api/top_news', []);

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
      <Grid container spacing={2} alignItems="center">
      {news && news.articles.map((article, indx) => (
        <Grid item xs={3} key={indx}>
        <NewsCardView article={article}/>
        </Grid>
      ))}
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
