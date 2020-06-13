import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectVideo, currentPage } from '../_actions';
import { Segment, Menu, Icon } from 'semantic-ui-react';
import 'antd/dist/antd.css';
import { Drawer } from 'antd';

const ResponsiveBar = ({ selectVideo, currentPage, categorys }) => {
  const [visible, setVisible] = useState(false);
  const [activeItem, setActiveItem] = useState('javascript');
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
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
            <Icon size="large" name="home" />
          </Menu.Item>
          <Menu.Item>
            <Icon size="large" name="youtube square" />
          </Menu.Item>
          <Menu.Item>
            <Icon size="large" name="user circle outline" />
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

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
  };
};

export default connect(null, { selectVideo, currentPage })(ResponsiveBar);
