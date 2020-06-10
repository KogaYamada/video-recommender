import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectVideo } from '../actions';

const CreateEditBar = ({ selectVideo }) => {
  return (
    <div class="ui inverted segment">
      <div class="ui inverted secondary pointing menu">
        <Link to="/">
          <object>
            <a href="/" class="item" style={{ fontSize: '1.1rem' }}>
              Home
            </a>
          </object>
        </Link>
        <Link
          to="video"
          onClick={() => {
            selectVideo(null);
          }}
        >
          <object>
            <a href="/" class="item" style={{ fontSize: '1.2rem' }}>
              Recommend
            </a>
          </object>
        </Link>
        <Link to="mypage">
          <object>
            <a href="/" class="item" style={{ fontSize: '1.2rem' }}>
              Mypage
            </a>
          </object>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { selectVideo })(CreateEditBar);
