import React from 'react';
import { connect } from 'react-redux';

const CommentList = ({ video }) => {
  console.log(video);
  const commentRender = () => {
    return;
  };
  return (
    <div>
      <div>お勧め者：{video.user}</div>
      <div>コメント：{video.comment}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { video: state.selectedVideo };
};

export default connect(mapStateToProps)(CommentList);
