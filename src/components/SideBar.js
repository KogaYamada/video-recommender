import React, { useState, useEffect } from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import { signIn, signOut } from '../actions';
import SigninModal from './SigninModal';

const SideBar = ({ onTermSubmit, auth }) => {
  const [activeItem, setActiveItem] = useState('');
  const [term, setTerm] = useState('');
  const [user, setUser] = useState(null);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);
  const checkLogin = () => {
    // handleItemClick();
    console.log(firebase.auth().currentUser);
    console.log(auth);
  };
  /**
   * サインアウトの処理
   */
  const logout = () => {
    firebase.auth().signOut();
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    onTermSubmit(term);
  };
  const sidebarRender = () => {
    if (user) {
      return (
        <Menu size="large" vertical>
          <Menu.Item>
            <form onSubmit={onFormSubmit}>
              <Input
                onChange={(e) => {
                  setTerm(e.target.value);
                }}
                placeholder="Search..."
              />
            </form>
          </Menu.Item>
          <Menu.Item>
            Home
            <Menu.Menu>
              <Menu.Item
                name="search"
                active={activeItem === 'search'}
                onClick={handleItemClick}
              >
                Search
              </Menu.Item>
              <Menu.Item
                name="add"
                active={activeItem === 'add'}
                onClick={handleItemClick}
              >
                Add
              </Menu.Item>
              <Menu.Item
                name="about"
                active={activeItem === 'about'}
                onClick={handleItemClick}
              >
                Remove
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item
            name="browse"
            active={activeItem === 'browse'}
            onClick={checkLogin}
          >
            <Icon name="grid layout" />
            Browse
          </Menu.Item>
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={logout}
          >
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
              <form onSubmit={onFormSubmit}>
                <Input
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                  placeholder="Search..."
                />
              </form>
            </Menu.Item>
            <Menu.Item name="login" active={activeItem === 'login'}>
              <SigninModal />
            </Menu.Item>
          </Menu>
          <div onClick={checkLogin}>確認</div>
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

export default connect(mapStateToProps, { signIn, signOut })(SideBar);
