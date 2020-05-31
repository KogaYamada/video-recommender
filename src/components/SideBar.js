import React, { useState } from 'react';
import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import Login from './Login';
import Signup from './Signup';

const SideBar = ({ onTermSubmit }) => {
  const [activeItem, setActiveItem] = useState('');
  const [renderForm, setRenderForm] = useState(null);
  const [term, setTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const onFormSubmit = (event) => {
    event.preventDefault();
    onTermSubmit(term);
  };

  const signupRender = () => {
    setRenderForm(<Signup setRenderForm={setRenderForm} />);
  };

  const sidebarRender = () => {
    if (isLoggedIn) {
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
            Browse
          </Menu.Item>
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={handleItemClick}
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
          <Menu.Item
            onClick={signupRender}
            name="login"
            active={activeItem === 'login'}
          >
            ログイン/サインアップ
          </Menu.Item>
          <div>{renderForm}</div>
        </Menu>
      );
    }
  };
  return (
    <div>
      {sidebarRender()}
      <button
        onClick={() => {
          setIsLoggedIn(!isLoggedIn);
        }}
      >
        change
      </button>
    </div>
  );
};

export default SideBar;
