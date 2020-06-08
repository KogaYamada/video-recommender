import React from 'react';
import { connect } from 'react-redux';
import Spiner from './Spiner';

const CommentList = ({ video }) => {
  if (!video.author) {
    return <Spiner />;
  }
  const commentRender = () => {
    return video.author.map((author) => {
      return (
        <div className="ui segment">
          <div className="ui header">
            <i class="comment alternate outline icon"></i>
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
