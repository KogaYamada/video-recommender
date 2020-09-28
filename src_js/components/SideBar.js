import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import SigninModal from './modal/SigninModal';
import { AuthContext } from './AuthContext';
import { selectVideo } from '../_actions';

const SideBar = ({ selectVideo }) => {
  const [activeItem, setActiveItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(AuthContext);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const recommendClick = (e, { name }) => {
    setActiveItem(name);
    selectVideo(null);
  };
  const sidebarRender = () => {
    if (user) {
      return (
        <Menu size="large" fixed vertical>
          <Menu.Item>
            <Menu.Header className="ui header">メニュー</Menu.Header>
          </Menu.Item>
          <Link to="/mypage">
            <object>
              <Menu.Item
                name="browse"
                active={activeItem === 'browse'}
                onClick={handleItemClick}
              >
                <Icon name="user circle" />
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
                <Icon name="youtube" />
                オススメする
              </Menu.Item>
            </object>
          </Link>
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Icon name="sign-out" />
            ログアウト
          </Menu.Item>
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
  return (
    <div>
      {sidebarRender()}
      <Modal open={isOpen} size="tiny">
        <Modal.Header content="確認" />
        <Modal.Content content="ログアウトしますか？" />
        <Modal.Actions>
          <Button
            content="キャンセル"
            onClick={() => {
              setIsOpen(false);
            }}
          />
          <Button
            content="ログアウト"
            onClick={() => {
              firebase.auth().signOut();
              setIsOpen(false);
            }}
            negative
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { selectVideo })(SideBar);
