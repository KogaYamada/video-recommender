import React from 'react';
import { setVideos, selectVideo } from '../_actions';
import Spiner from './Spiner';

import { connect } from 'react-redux';

const VideoDetail = ({ selectedVideo, isSearch, setVideos, selectVideo }) => {
  if (!selectedVideo) {
    return <Spiner />;
  }
  const videoSrc = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;

  return (
    <div>
      <div className="ui embed">
        <iframe title="video player" src={videoSrc} />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{selectedVideo.snippet.title}</h4>
        <p>{selectedVideo.snippet.description}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedVideo: state.selectedVideo,
    isSearch: state.isSearch,
  };
};

export default connect(mapStateToProps, { setVideos, selectVideo })(
  VideoDetail
);
