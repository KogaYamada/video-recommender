import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectVideo } from '../../_actions';
import { Menu, Segment, Icon } from 'semantic-ui-react';

const CreateEditBar = ({ selectVideo }) => {
  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item>
          <Link to="/">
            <Icon color="blue" name="home" />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            to="video"
            onClick={() => {
              selectVideo(null);
            }}
          >
            <Icon color="red" name="youtube square" />
            Recommend
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="mypage">
            <Icon color="olive" name="user circle outline" />
            Mypage
          </Link>
        </Menu.Item>
      </Menu>
    </Segment>
  );
};

export default connect(null, { selectVideo })(CreateEditBar);
