import React from 'react';
import { connect } from 'react-redux';
import Spiner from './Spiner';
import { Segment, Icon, Header, Message } from 'semantic-ui-react';

const CommentList = ({ video }) => {
  if (!video.author) {
    return <Spiner />;
  }
  const commentRender = () => {
    return video.author.map((author) => {
      return (
        <Message>
          <Header as="h3" className="ui header">
            <Icon name="comment alternate outline" />
            {author.userName}
          </Header>
          <div>{author.comment}</div>
        </Message>
      );
    });
  };
  return (
    <Segment>
      <Header as="h3" icon textAlign="center">
        <Icon size="mini" name="comments outline" />
        <Header.Content>オススメコメント</Header.Content>
      </Header>
      {commentRender()}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return { video: state.selectedVideo };
};

export default connect(mapStateToProps)(CommentList);
