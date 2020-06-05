import React from 'react';
import CommentList from './CommentList';

import { connect } from 'react-redux';

const VideoDetail = ({ selectedVideo }) => {
  if (!selectedVideo) {
    return <div>Loading....</div>;
  }
  console.log(selectedVideo.comment);

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
      <div className="ui segment">
        <CommentList />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedVideo: state.selectedVideo,
  };
};

export default connect(mapStateToProps)(VideoDetail);
