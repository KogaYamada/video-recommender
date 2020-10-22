import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthContext } from '../AuthContext';
import { selectVideo, setVideos, selectDevCategory } from '../../_actions';
import { Segment, Menu, Icon, Modal, Button } from 'semantic-ui-react';
import 'antd/dist/antd.css';
import { Drawer } from 'antd';
import SigninModal from '../modal/SigninModal';
import firebase from '../../config/firebase';

const ResponsiveBar = ({
  selectVideo,
  categorys,
  setVideos,
  selectDevCategory,
}) => {
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('javascript');
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(AuthContext);
  /**
   * メニューのアクティブ状態を切り替える関数
   */
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);

    switch (name) {
      case 'javascript':
        setVideos(categorys[0].videos);
        selectVideo(categorys[0].videos[0]);
        selectDevCategory(categorys[0]);
        break;
      case 'node':
        setVideos(categorys[1].videos);
        selectVideo(categorys[1].videos[0]);
        selectDevCategory(categorys[1]);
        break;
      case 'deno':
        setVideos(categorys[2].videos);
        selectVideo(categorys[2].videos[0]);
        selectDevCategory(categorys[2]);
        break;
      case 'react':
        setVideos(categorys[3].videos);
        selectVideo(categorys[3].videos[0]);
        selectDevCategory(categorys[3]);
        break;
      case 'vue':
        setVideos(categorys[4].videos);
        selectVideo(categorys[4].videos[0]);
        selectDevCategory(categorys[4]);
        break;
      case 'angular':
        setVideos(categorys[5].videos);
        selectVideo(categorys[5].videos[0]);
        selectDevCategory(categorys[5]);
        break;
      case 'other':
        setVideos(categorys[6].videos);
        selectVideo(categorys[6].videos[0]);
        selectDevCategory(categorys[6]);
        break;
      default:
        return;
    }
    onClose();
  };
  /**
   * ドロワーを開く関数
   */
  const showDrawer = () => {
    setVisible(true);
  };
  /**
   * ドロワーを閉じる関数
   */
  const onClose = () => {
    setVisible(false);
  };
  const initVideo = () => {
    selectVideo(null);
    setVideos([]);
  };
  /**
   * ドロワーの中のカテゴリー一覧をレンダリングする関数
   */
  const renderedCategory = () => {
    return categorys.map((category) => {
      return (
        <Menu.Item
          name={category.key}
          active={activeItem === category.key}
          onClick={handleItemClick}
        >
          {category.title}
        </Menu.Item>
      );
    });
  };
  const renderedLoginBar = () => {
    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item>
            <Icon name="sign-in" size="large" color="orange" />
            <SigninModal />
          </Menu.Item>
          <Menu.Item position="right" onClick={showDrawer}>
            <Icon size="large" name="bars" />
          </Menu.Item>
        </Menu>
      </Segment>
    );
  };
  const renderedLoggedinBar = () => {
    return (
      <>
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Item>
              <Link to="/">
                <Icon color="blue" size="large" name="home" />
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/video" onClick={initVideo}>
                <Icon color="red" size="large" name="youtube square" />
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/mypage">
                <Icon color="olive" size="large" name="user circle outline" />
              </Link>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <Icon color="orange" size="large" name="sign-out" />
            </Menu.Item>
            <Menu.Item position="right" onClick={showDrawer}>
              <Icon size="large" name="bars" />
            </Menu.Item>
          </Menu>
        </Segment>
      </>
    );
  };
  return (
    <>
      {user ? renderedLoggedinBar() : renderedLoginBar()}
      {/* ドロワー */}
      <Drawer
        closable={true}
        placement="right"
        onClose={onClose}
        title="カテゴリー"
        visible={visible}
      >
        <Menu pointing secondary vertical>
          {renderedCategory()}
        </Menu>
      </Drawer>
      {/* モーダル */}
      <Modal open={isOpen}>
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
    </>
  );
};

export default connect(null, { selectVideo, setVideos, selectDevCategory })(
  ResponsiveBar
);
