import React from 'react';
import { connect } from 'react-redux';
import { selectVideo, setVideos, isSearch } from '../../_actions';
import TopBar from '../TopBar';
import SideBar from '../SideBar';
import VideoDetail from '../VideoDetail';
import VideoList from '../VideoList';
import CommentList from '../CommentList';

const TopPage = ({ video, videos, isSearchState }) => {
  return (
    <div>
      <TopBar />
      <div className="ui grid raised segment">
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
