import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, InputAdornment, Button, Grid, LinearProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import useFetch from 'use-http';
import NewsCardView from './NewsCardView';
import SearchAndFilterView from './SearchAndFilterView';


const useStyles = makeStyles((theme) => ({
}));


const Dashboard = props => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const {get: fetchNews, data: news, errors, loading} = useFetch('/api/news-api/top_news', []);
  const [bookMarkRequest, bookMarkResponse] = useFetch('/api/book-mark-news');

  const handleSearchAndFilter = params => {
    let query="";
    if(params.searchKeyword) query += "q="+params.searchKeyword;
    if(params.country) query += "&country="+params.country;
    if(params.category) query += "&category="+params.category;
    if(params.source) query += "&source="+params.source;
    fetchNews(`?${query}`);
  };

  const createBookMark = async article => {
    const data = {title: article.title, url: article.url};
    const res = await bookMarkRequest.post('/', data);
    if(bookMarkResponse.ok) {
      enqueueSnackbar('Successfully Book Marked', {variant: 'success'});
    } else {
      enqueueSnackbar('Already Book Marked', {variant: 'warning'});
    }
  };

  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchAndFilterView onClickSearch={handleSearchAndFilter}/>
          {loading &&
            <LinearProgress />
          }
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
          {news && news.articles.map((article, indx) => (
            <Grid item xs={3} key={indx}>
            <NewsCardView article={article} onClickBookMark={createBookMark}/>
            </Grid>
          ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
