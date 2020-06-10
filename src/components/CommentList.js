import React from 'react';
import { connect } from 'react-redux';
import Spiner from './Spiner';

const CommentList = ({ video }) => {
  if (!video.author) {
    return <Spiner />;
  }
  const commentRender = () => {
    console.log(video);
    return video.author.map((author) => {
      return (
        <div className="ui segment">
          <div className="ui header">
            <i className="comment alternate outline icon"></i>
            {author.userName}
          </div>
          <div>{author.comment}</div>
        </div>
      );
    });
  };
  return <div>{commentRender()}</div>;
};

const mapStateToProps = (state) => {
  return { video: state.selectedVideo };
};

export default connect(mapStateToProps)(CommentList);
