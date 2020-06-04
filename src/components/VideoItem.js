import './css/VideoItem.css';
import React from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../actions';

const VideoItem = ({ video, selectVideo }) => {
  const ClickItem = () => {
    selectVideo(video);
  };
  return (
    <div onClick={ClickItem} className="video-item item">
      <img
        alt={video.snippet.title}
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { selectedVideo: state.selectedVideo };
};

export default connect(mapStateToProps, { selectVideo })(VideoItem);
