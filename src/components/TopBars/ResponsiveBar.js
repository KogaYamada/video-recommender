import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectVideo, setVideos } from '../../_actions';
import { Segment, Menu, Icon } from 'semantic-ui-react';
import 'antd/dist/antd.css';
import { Drawer } from 'antd';

const ResponsiveBar = ({ selectVideo, categorys, setVideos }) => {
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('javascript');
  /**
   * メニューのアクティブ状態を切り替える関数
   */
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    switch (name) {
      case 'javascript':
        setVideos(categorys[0].videos);
        selectVideo(categorys[0].videos[0]);
        break;
      case 'node':
        setVideos(categorys[1].videos);
        selectVideo(categorys[1].videos[0]);
        break;
      case 'deno':
        setVideos(categorys[2].videos);
        selectVideo(categorys[2].videos[0]);
        break;
      case 'react':
        setVideos(categorys[3].videos);
        selectVideo(categorys[3].videos[0]);
        break;
      case 'vue':
        setVideos(categorys[4].videos);
        selectVideo(categorys[4].videos[0]);
        break;
      case 'angular':
        setVideos(categorys[5].videos);
        selectVideo(categorys[5].videos[0]);
        break;
      case 'other':
        setVideos(categorys[6].videos);
        selectVideo(categorys[6].videos[0]);
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
  return (
    <>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item>
            <Link to="/video-recommender">
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
          <Menu.Item position="right" onClick={showDrawer}>
            <Icon size="large" name="bars" />
          </Menu.Item>
        </Menu>
      </Segment>

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
    </>
  );
};

export default connect(null, { selectVideo, setVideos })(ResponsiveBar);
