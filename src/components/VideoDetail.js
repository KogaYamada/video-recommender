import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectVideo } from '../actions';

const VideoDetail = ({ selectedVideo }) => {
  if (!selectedVideo) {
    return <div>Loading....</div>;
  }
  console.log(selectedVideo);
  const videoSrc = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;

  return (
    <div>
      <div className="ui embed">
        <iframe title="video player" src={videoSrc} />
      </div>
      <div className="ui segment">
        <h4 className="ui header">{selectedVideo.snippet.title}</h4>
        <p>{selectedVideo.snippet.description}</p>
        <button className="ui button primary">recomend!</button>
        <Link to="/video" className="ui button primary">
          オススメする
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { selectedVideo: state.selectedVideo };
};

export default connect(mapStateToProps)(VideoDetail);
