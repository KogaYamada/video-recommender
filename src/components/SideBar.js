import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import SigninModal from './modal/SigninModal';
import { AuthContext } from './AuthContext';
import { isSearch, selectVideo } from '../actions';

const SideBar = ({ selectVideo }) => {
  const [activeItem, setActiveItem] = useState('');
  const user = useContext(AuthContext);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const recommendClick = (e, { name }) => {
    setActiveItem(name);
    selectVideo(null);
  };
  /**
   * サインアウトの処理
   */
  const logout = () => {
    firebase.auth().signOut();
  };

  const sidebarRender = () => {
    if (user) {
      return (
        <Menu size="large" vertical>
          <object>
            <Menu.Item>
              <h3 className="ui header">
                <div className="content">メニュー</div>
              </h3>
            </Menu.Item>
          </object>
          <Link to="/mypage">
            <object>
              <Menu.Item
                name="browse"
                active={activeItem === 'browse'}
                onClick={handleItemClick}
              >
                <i className="user circle icon" />
                マイページ
              </Menu.Item>
            </object>
          </Link>

          <Link to="/video">
            <object>
              <Menu.Item
                name="browse"
                active={activeItem === 'browse'}
                onClick={recommendClick}
              >
                <i className="youtube icon" />
                オススメする
              </Menu.Item>
            </object>
          </Link>
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={logout}
          >
            <i className="sign-out icon" />
            ログアウト
          </Menu.Item>
          <Dropdown item text="More">
            <Dropdown.Menu>
              <Dropdown.Item icon="edit" text="Edit Profile" />
              <Dropdown.Item icon="globe" text="Choose Language" />
              <Dropdown.Item icon="settings" text="Account Settings" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
      );
    } else {
      return (
        <div>
          <Menu size="large" vertical>
            <Menu.Item>
              <h3 className="ui header">メニュー</h3>
            </Menu.Item>
            <Menu.Item name="login" active={activeItem === 'login'}>
              <i className="sign-in icon" />
              <SigninModal />
            </Menu.Item>
          </Menu>
        </div>
      );
    }
  };
  return <div>{sidebarRender()}</div>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { selectVideo })(SideBar);
