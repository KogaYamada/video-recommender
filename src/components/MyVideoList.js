import React from 'react';
import MyVideoItem from './MyVideoItem';

const MyVideoList = ({ videoList }) => {
  const colorChecker = (category) => {
    switch (category) {
      case 'javascript':
        return '#fbbd08';
      case 'node':
        return '#21BA45';
      case 'deno':
        return '#6435c9';
      case 'react':
        return '#2185d0';
      case 'vue':
        return '#00B5AD';
      case 'angular':
        return '#db2828';
      case 'other':
        return '#767676';
      default:
        return;
    }
  };
  const videoRendered = () => {
    return videoList.map((video) => {
      const color = colorChecker(video.category);
      return (
        <div
          className="ui items"
          style={{
            paddingBottom: '2px',
            borderBottom: `2px solid ${color}`,
          }}
        >
          <MyVideoItem key={video.videId} video={video} videoList={videoList} />
        </div>
      );
    });
  };
  return <div>{videoRendered()}</div>;
};

export default MyVideoList;
