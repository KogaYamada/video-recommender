import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { selectVideo, setVideos, isSearch } from '../../actions';
import { AuthContext } from '../AuthContext';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import VideoDetail from '../VideoDetail';
import VideoList from '../VideoList';
import CommentList from '../CommentList';

const TopPage = ({
  selectVideo,
  video,
  videos,
  setVideos,
  isSearchState,
  isSearch,
}) => {
  const user = useContext(AuthContext);

  return (
    <div>
      <TopBar />
      <div className="ui grid segment">
        <div className="three wide column">
          <SideBar />
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
