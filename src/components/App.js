import React, { useState } from 'react';
import SideBar from './SideBar';
import TopBar from './TopBar';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';
import youtube from '../config/youtube';

const KEY = 'AIzaSyAfub-68QTWGpc5-_LqzSWjb5q9vS_A2SQ';

const App = () => {
  const [categorys, setCategorys] = useState([
    {
      title: 'JavaScript',
      color: 'yellow',
      isActive: true,
    },
    {
      title: 'Node.js',
      color: 'green',
      isActive: false,
    },
    {
      title: 'React/React Native',
      color: 'blue',
      isActive: false,
    },
    {
      title: 'Vue.js',
      color: 'teal',
      isActive: false,
    },
    {
      title: 'Angular',
      color: 'red',
      isActive: false,
    },
  ]);

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
    <div className="">
      <TopBar categorys={categorys} setCategorys={setCategorys} />
      <div className="ui grid segment">
        <div className="four wide column">
          <SideBar />
        </div>
        <div className="eight wide column">
          <div className="ui segment">
            <VideoDetail />
          </div>
        </div>
        <div className="four wide column">
          <VideoList />
        </div>
      </div>
    </div>
  );
};

export default App;
