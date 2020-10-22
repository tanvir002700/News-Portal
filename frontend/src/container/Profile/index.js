import React, { useState } from 'react';
import useFetch from 'use-http';
import Pagination from "material-ui-flat-pagination";
import BookMarkedNews from './BookMarkedNews';


const Profile = props => {
  const [offset, setOffset] = useState(0);
  const {
    get: fetchBookMarkedNews,
    data: bookMarkedNews} = useFetch(`/api/book-mark-news/?limit=25&offset=${offset}`, [offset]);
  const [
    removeBookMarkedNewsRequest,
    removeBookMarkedNewsResponse] = useFetch('/api/book-mark-news');

  const handleRemoveBookMark = async data => {
    await removeBookMarkedNewsRequest.delete(`/${data.id}/`);
    if(removeBookMarkedNewsResponse.ok) fetchBookMarkedNews();
  };

  return (
    <React.Fragment>
      {(bookMarkedNews && bookMarkedNews.count) ? bookMarkedNews.results.map(news => (
        <BookMarkedNews
          key={news.id}
          news={news}
          onClickRemoveBookMark={handleRemoveBookMark}
        />
      )) : (<h1>No Bookmark</h1>)}
      {(bookMarkedNews && bookMarkedNews.count) ?
      <Pagination
          limit={25}
          offset={offset}
          total={bookMarkedNews.count}
          onClick={(e, offset) => setOffset(offset)}
      />: null}
    </React.Fragment>
  );
};

export default Profile;
