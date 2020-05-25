import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import youtube from '../config/youtube';

const KEY = 'AIzaSyAfub-68QTWGpc5-_LqzSWjb5q9vS_A2SQ';

const App = () => {
  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 5,
        key: KEY,
      },
    });
  };
  return (
    <div>
      <SideBar />
    </div>
  );
};

export default App;
