import React from 'react';
import { connect } from 'react-redux';
import { selectVideo } from '../actions';
import VideoItem from './VideoItem';

const VideoList = ({ videos, selectedDevCategory, isSearch }) => {
  const renderedList = videos.map((video) => {
    return <VideoItem video={video} />;
  });

  return (
    <>
      {isSearch ? (
        ''
      ) : (
        <div
          className={`ui center aligned ${
            selectedDevCategory ? selectedDevCategory.color : 'grey'
          } segment`}
        >
          {`${selectedDevCategory.title}の`}オススメ動画
        </div>
      )}
      <div className="ui relaxed divided list">{renderedList}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDevCategory: state.selectedDevCategory,
    videos: state.videos,
    isSearch: state.isSearch,
  };
};

export default connect(mapStateToProps, selectVideo)(VideoList);
