import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDevCategory, setVideos, selectVideo } from '../actions';
import firebase from '../config/firebase';
import { AuthContext } from './AuthContext';

const categorys = [
  {
    title: 'JavaScript',
    color: 'yellow',
    isActive: true,
    key: 'javascript',
  },
  {
    title: 'Node.js',
    color: 'green',
    isActive: false,
    key: 'node',
  },
  {
    title: 'Deno',
    color: 'violet',
    isActive: false,
    key: 'deno',
  },
  {
    title: 'React/React Native',
    color: 'blue',
    isActive: false,
    key: 'react',
  },
  {
    title: 'Vue.js',
    color: 'teal',
    isActive: false,
    key: 'vue',
  },
  {
    title: 'Angular.js',
    color: 'red',
    isActive: false,
    key: 'angular',
  },
  {
    title: 'Other',
    color: 'grey',
    isActive: false,
    key: 'other',
  },
];

const TopBar = ({ selectDevCategory, setVideos, selectVideo }) => {
  const getJsVideos = () => {
    db.collection('javascriptRecommend')
      .get()
      .then((querySnapshot) => {
        let datas = [];
        querySnapshot.forEach((doc) => {
          datas = [...datas, doc.data()];
        });
        selectVideo(datas[0]);
        setVideos(datas);
      });
  };

  const getNodeVideos = () => {
    db.collection('nodeRecommend')
      .get()
      .then((querySnapshot) => {
        let datas = [];
        querySnapshot.forEach((doc) => {
          datas = [...datas, doc.data()];
        });
        selectVideo(datas[0]);
        setVideos(datas);
      });
  };

  const getDenoVideos = () => {
    db.collection('denoRecommend')
      .get()
      .then((querySnapshot) => {
        let datas = [];
        querySnapshot.forEach((doc) => {
          datas = [...datas, doc.data()];
        });
        selectVideo(datas[0]);
        setVideos(datas);
      });
  };

  const getReactVideos = () => {
    db.collection('reactRecommend')
      .get()
      .then((querySnapshot) => {
        let datas = [];
        querySnapshot.forEach((doc) => {
          datas = [...datas, doc.data()];
        });
        selectVideo(datas[0]);
        setVideos(datas);
      });
  };

  const getVueVideos = () => {
    db.collection('vueRecommend')
      .get()
      .then((querySnapshot) => {
        let datas = [];
        querySnapshot.forEach((doc) => {
          datas = [...datas, doc.data()];
        });
        selectVideo(datas[0]);
        setVideos(datas);
      });
  };

  const getAngularVideos = () => {
    db.collection('angularRecommend')
      .get()
      .then((querySnapshot) => {
        let datas = [];
        querySnapshot.forEach((doc) => {
          datas = [...datas, doc.data()];
        });
        selectVideo(datas[0]);
        setVideos(datas);
      });
  };

  const getOtherVideos = () => {
    db.collection('otherRecommend')
      .get()
      .then((querySnapshot) => {
        let datas = [];
        querySnapshot.forEach((doc) => {
          datas = [...datas, doc.data()];
        });
        selectVideo(datas[0]);
        setVideos(datas);
      });
  };
  /**
   * ユーザー情報の取得
   */
  const user = useContext(AuthContext);
  /**
   * firestoreの参照
   */
  const db = firebase.firestore();
  /**
   * カテゴリーを押した時の処理
   */
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

    switch (event.target.textContent) {
      case 'JavaScript':
        getJsVideos();
        break;
      case 'Node.js':
        getNodeVideos();
        break;
      case 'Deno':
        getDenoVideos();
        break;
      case 'React/React Native':
        getReactVideos();
        break;
      case 'Vue.js':
        getVueVideos();
        break;
      case 'Angular.js':
        getAngularVideos();
        break;
      case 'Other':
        getOtherVideos();
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
    <div>
      <div className="ui massive inverted menu">
        <Link to="/">
          <h3
            style={{
              color: 'white',
              textAlign: 'center',
              verticalAlign: 'middle',
              marginTop: '10px',
            }}
            className="ui header"
          >
            ようこそ、{user ? user.displayName : ''}さん
          </h3>
        </Link>
        {renderTopBar()}
      </div>
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
})(TopBar);
