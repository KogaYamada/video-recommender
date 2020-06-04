import React, { useState, useContext } from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import SigninModal from './SigninModal';
import { AuthContext } from './AuthContext';

const SideBar = ({ onTermSubmit, auth }) => {
  const [activeItem, setActiveItem] = useState('');
  const [term, setTerm] = useState('');
  const user = useContext(AuthContext);
  const handleItemClick = (e, { name }) => setActiveItem(name);
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
            onClick={handleItemClick}
          >
            <Icon name="grid layout" />
            オススメする
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
            {/* <Menu.Item>
              <form onSubmit={onFormSubmit}>
                <Input
                  onChange={(e) => {
                    setTerm(e.target.value);
                  }}
                  placeholder="Search..."
                />
              </form>
            </Menu.Item> */}
            <Menu.Item name="login" active={activeItem === 'login'}>
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

export default connect(mapStateToProps)(SideBar);
