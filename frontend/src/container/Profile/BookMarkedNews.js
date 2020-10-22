import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const BookMarkedNews = ({news, onClickRemoveBookMark}) => {
  const classes = useStyles();

  const openLinkNewTab = data => {
    const newWindow = window.open(data.url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  };

  const handleOnClickRemoveBookMark = data => {
    if(onClickRemoveBookMark) onClickRemoveBookMark(data);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {news.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => openLinkNewTab(news)}>
          Go to news
        </Button>

        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => handleOnClickRemoveBookMark(news)}>
          Remove BookMark
        </Button>
      </CardActions>
    </Card>
  );
}

export default BookMarkedNews;
