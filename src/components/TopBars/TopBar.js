import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectDevCategory,
  setVideos,
  selectVideo,
  isSearch,
} from '../../_actions';
import firebase from '../../config/firebase';

const TopBar = ({
  selectDevCategory,
  setVideos,
  selectVideo,
  isSearch,
  categorys,
}) => {
  /**
   * カテゴリーを押した時の処理
   */
  //-------------------------[START changeActive function]-----------------------------------
  const changeActive = (event) => {
    event.preventDefault();
    /**
     * カテゴリーの要素の配列
     */
    const items = document.querySelectorAll('.item');
    // itemsのactive要素を全て削除
    for (const category of items) {
      category.classList.remove('active');
    }
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
    event.target.classList.add('active'); // クリックした要素にactiveクラスを追加
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
      /**
       * 最初の要素にクラスrightを追加
       */
      const classRight = index === 0 ? 'right' : '';
      /**
       * isActiveがtrueの要素にクラスactiveを追加
       */
      const classActive = category.isActive ? 'active' : '';
      return (
        <a
          key={category.title}
          href="/"
          onClick={changeActive}
          className={`${category.color} item ${classRight} ${classActive}`}
        >
          {category.title}
        </a>
      );
    });
  };
  return (
    <div className="ui massive inverted menu">
      <Link to="/video-recommender">
        <h3
          style={{
            color: 'white',
            textAlign: 'center',
            verticalAlign: 'middle',
            marginTop: '10px',
            marginLeft: '20px',
          }}
          className="ui header"
        >
          Video Recommender
        </h3>
      </Link>
      {renderTopBar()}
    </div>
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
