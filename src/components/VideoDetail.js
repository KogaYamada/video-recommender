import React from 'react';
import { setVideos, selectVideo } from '../_actions';
import Spiner from './Spiner';
import { Header, Segment } from 'semantic-ui-react';

import { connect } from 'react-redux';

const VideoDetail = ({ selectedVideo, isSearch, setVideos, selectVideo }) => {
  if (!selectedVideo) {
    return <Spiner />;
  }
  const videoSrc = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;
  return (
    <>
      <div className="ui embed">
        <iframe title="video player" src={videoSrc} />
      </div>
      <Segment>
        <Header as="h4">{selectedVideo.snippet.title}</Header>
        <p>{selectedVideo.snippet.description}</p>
      </Segment>
    </>
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
