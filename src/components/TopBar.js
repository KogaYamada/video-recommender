import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectDevCategory,
  setVideos,
  selectVideo,
  isSearch,
} from '../_actions';
import firebase from '../config/firebase';

const TopBar = ({ selectDevCategory, setVideos, selectVideo, isSearch }) => {
  const [jsVideo, setJsVideo] = useState([]);
  const [nodeVideo, setNodeVideo] = useState([]);
  const [denoVideo, setDenoVideo] = useState([]);
  const [reactVideo, setReactVideo] = useState([]);
  const [vueVideo, setVueVideo] = useState([]);
  const [angularVideo, setAngularVideo] = useState([]);
  const [otherVideo, setOtherVideo] = useState([]);
  /**
   * おすすめ動画のカテゴリーとその基本データ
   */
  const categorys = [
    {
      title: 'JavaScript',
      color: 'yellow',
      isActive: true,
      key: 'javascript',
      videos: jsVideo,
      setVideos: (videos) => {
        setJsVideo(videos);
      },
    },
    {
      title: 'Node.js',
      color: 'green',
      isActive: false,
      key: 'node',
      videos: nodeVideo,
      setVideos: (videos) => {
        setNodeVideo(videos);
      },
    },
    {
      title: 'Deno',
      color: 'violet',
      isActive: false,
      key: 'deno',
      videos: denoVideo,
      setVideos: (videos) => {
        setDenoVideo(videos);
      },
    },
    {
      title: 'React/React Native',
      color: 'blue',
      isActive: false,
      key: 'react',
      videos: reactVideo,
      setVideos: (videos) => {
        setReactVideo(videos);
      },
    },
    {
      title: 'Vue.js',
      color: 'teal',
      isActive: false,
      key: 'vue',
      videos: vueVideo,
      setVideos: (videos) => {
        setVueVideo(videos);
      },
    },
    {
      title: 'Angular.js',
      color: 'red',
      isActive: false,
      key: 'angular',
      videos: angularVideo,
      setVideos: (videos) => {
        setAngularVideo(videos);
      },
    },
    {
      title: 'Other',
      color: 'grey',
      isActive: false,
      key: 'other',
      videos: otherVideo,
      setVideos: (videos) => {
        setOtherVideo(videos);
      },
    },
  ];
  /**
   * firestoreの参照
   */
  const db = firebase.firestore();
  /**
   * ページが読み込まれた時の処理
   */
  useEffect(() => {
    categorys.forEach((category) => {
      db.collection(`${category.key}Recommend`)
        .get()
        .then((querySnapshot) => {
          const datas = [];
          querySnapshot.forEach((doc) => {
            datas.push(doc.data());
          });
          category.setVideos(datas);
          if (category.key === 'javascript') {
            setVideos(datas);
            selectVideo(datas[0]);
          }
        });
    });
    isSearch(false);
    selectDevCategory(categorys[0]);
  }, []);
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
        setVideos(jsVideo);
        selectVideo(jsVideo[0]);
        break;
      case 'Node.js':
        setVideos(nodeVideo);
        selectVideo(nodeVideo[0]);
        break;
      case 'Deno':
        setVideos(denoVideo);
        selectVideo(denoVideo[0]);
        break;
      case 'React/React Native':
        setVideos(reactVideo);
        selectVideo(reactVideo[0]);
        break;
      case 'Vue.js':
        setVideos(vueVideo);
        selectVideo(vueVideo[0]);
        break;
      case 'Angular.js':
        setVideos(angularVideo);
        selectVideo(angularVideo[0]);
        break;
      case 'Other':
        setVideos(otherVideo);
        selectVideo(otherVideo[0]);
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
          {/* {user ? `ようこそ、${user.displayName}さん` : ''} */}
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
