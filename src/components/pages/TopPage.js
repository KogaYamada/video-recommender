import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { selectVideo, setVideos, isSearch } from '../../actions';
import { AuthContext } from '../AuthContext';
import SideBar from '../SideBar';
import VideoDetail from '../VideoDetail';
import VideoList from '../VideoList';
import CommentList from '../CommentList';
import youtube from '../../config/youtube';

const KEY = 'AIzaSyAfub-68QTWGpc5-_LqzSWjb5q9vS_A2SQ';

const TopPage = ({
  selectVideo,
  video,
  videos,
  setVideos,
  isSearchState,
  isSearch,
}) => {
  const user = useContext(AuthContext);
  /**
   * 動画を検索した時の処理
   */
  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 7,
        key: KEY,
      },
    });
    selectVideo(response.data.items[0]);
    setVideos(response.data.items);
    isSearch(true);
  };

  return (
    <div>
      <div className="ui grid segment">
        <div className="three wide column">
          <SideBar onTermSubmit={onTermSubmit} />
        </div>
        <div className="eight wide column">
          <div className="ui segment">
            <VideoDetail video={video} />
          </div>
          <div>{video && !isSearchState ? <CommentList /> : ''}</div>
        </div>
        <div className="five wide column">
          <VideoList videos={videos} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    video: state.selectedVideo,
    videos: state.videos,
    isSearchState: state.isSearch,
  };
};

export default connect(mapStateToProps, { selectVideo, setVideos, isSearch })(
  TopPage
);
