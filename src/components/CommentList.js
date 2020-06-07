import React from 'react';
import { connect } from 'react-redux';

const CommentList = ({ video }) => {
  const commentRender = () => {
    return;
  };
  return (
    <div className="ui segment">
      <div className="ui header">
        <i class="star outline icon"></i>
        {video.user}
      </div>
      <div>{video.comment}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { video: state.selectedVideo };
};

export default connect(mapStateToProps)(CommentList);
