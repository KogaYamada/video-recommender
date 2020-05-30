import React, { useState } from 'react';
import SideBar from '../SideBar';
import TopBar from '../TopBar';
import VideoDetail from '../VideoDetail';
import VideoList from '../VideoList';
import youtube from '../../config/youtube';

const KEY = 'AIzaSyAfub-68QTWGpc5-_LqzSWjb5q9vS_A2SQ';

const TopPage = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 5,
        key: KEY,
      },
    });
    setVideos(response.data.items);
    setSelectedVideo(response.data.items[0]);
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div>
      <TopBar setVideos={setVideos} />
      <div className="ui grid segment">
        <div className="three wide column">
          <SideBar onTermSubmit={onTermSubmit} />
        </div>
        <div className="eight wide column">
          <div className="ui segment">
            <VideoDetail video={selectedVideo} />
          </div>
        </div>
        <div className="five wide column">
          <VideoList onVideoSelect={onVideoSelect} videos={videos} />
        </div>
      </div>
    </div>
  );
};

export default TopPage;
