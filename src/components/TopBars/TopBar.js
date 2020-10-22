import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Header } from 'semantic-ui-react';
import {
  selectDevCategory,
  setVideos,
  selectVideo,
  isSearch,
} from '../../_actions';

const TopBar = ({
  selectDevCategory,
  setVideos,
  selectVideo,
  isSearch,
  categorys,
}) => {
  const [active, setActive] = useState(categorys[0].key);
  /**
   * カテゴリーを押した時の処理
   */
  //-------------------------[START changeActive function]-----------------------------------
  const changeActive = (event, { name }) => {
    event.preventDefault();
    setActive(name);
    // isActiveを全てfalseにする
    categorys.forEach((category) => {
      if (category.isActive) {
        category.isActive = false;
      }
    });
    // クリックした要素のisActiveをtrueにする+取得する
    categorys.forEach((category) => {
      if (category.title === event.target.textContent) {
        category.isActive = true;
        selectDevCategory(category);
      }
    });
    isSearch(false); // 検索状態をオフに
    switch (event.target.textContent) {
      case 'JavaScript':
        setVideos(categorys[0].videos);
        selectVideo(categorys[0].videos[0]);
        break;
      case 'Node.js':
        setVideos(categorys[1].videos);
        selectVideo(categorys[1].videos[0]);
        break;
      case 'Deno':
        setVideos(categorys[2].videos);
        selectVideo(categorys[2].videos[0]);
        break;
      case 'React/React Native':
        setVideos(categorys[3].videos);
        selectVideo(categorys[3].videos[0]);
        break;
      case 'Vue.js':
        setVideos(categorys[4].videos);
        selectVideo(categorys[4].videos[0]);
        break;
      case 'Angular.js':
        setVideos(categorys[5].videos);
        selectVideo(categorys[5].videos[0]);
        break;
      case 'Other':
        setVideos(categorys[6].videos);
        selectVideo(categorys[6].videos[0]);
        break;
      default:
        return;
    }
  }; //----[END changeActive function]-----------------------------------

  /**
   * カテゴリー一覧をレンダリングする関数
   */
  const renderTopBar = () => {
    return categorys.map((category, index) => {
      return (
        <Menu.Item
          position={index === 0 ? 'right' : null}
          color={category.color}
          name={category.key}
          key={category.title}
          onClick={changeActive}
          active={active === category.key}
        >
          {category.title}
        </Menu.Item>
      );
    });
  };
  return (
    <Menu className="ui massive inverted menu">
      <Link to="/">
        <Header
          as="h3"
          style={{
            color: 'white',
            textAlign: 'center',
            verticalAlign: 'middle',
            marginTop: '10px',
            marginLeft: '20px',
          }}
        >
          Video Recommender
        </Header>
      </Link>
      {renderTopBar()}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDevCategory: state.selectedDevCategory,
  };
};

export default connect(mapStateToProps, {
  selectDevCategory,
  setVideos,
  selectVideo,
  isSearch,
})(TopBar);
