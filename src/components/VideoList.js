import React from 'react';
import { connect } from 'react-redux';
import { selectDevCategory } from '../actions';
import VideoItem from './VideoItem';

//({ videos, onVideoSelect }) =>
class VideoList extends React.Component {
  render() {
    const renderedList = this.props.videos.map((video) => {
      return (
        <VideoItem onVideoSelect={this.props.onVideoSelect} video={video} />
      );
    });

    return <div className="ui relaxed divided list">{renderedList}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDevCategory: state.selectDevCategory,
    devCategory: state.devCategory,
  };
};

export default connect(mapStateToProps, { selectDevCategory })(VideoList);
