import React from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../actions';
import VideoItem from './VideoItem';

const VideoList = ({ videos }) => {
  const renderedList = videos.map((video) => {
    return <VideoItem video={video} />;
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

const mapStateToProps = (state) => {
  return {
    selectedDevCategory: state.selectDevCategory,
    videos: state.videos,
  };
};

export default connect(mapStateToProps, selectVideo)(VideoList);
