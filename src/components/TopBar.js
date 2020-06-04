import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectDevCategory } from '../actions';
import firebase from '../config/firebase';
import { AuthContext } from './AuthContext';

const categorys = [
  {
    title: 'JavaScript',
    color: 'yellow',
    isActive: true,
    key: 'js',
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

const TopBar = ({ selectDevCategory }) => {
  const username = useContext(AuthContext);
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
        console.log(selectDevCategory);
        selectDevCategory(category);
      }
    });
    event.target.classList.add('active'); // クリックした要素にactiveクラスを追加
  };

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
          <h1 style={{ color: 'white' }} className="ui header">
            Video category
          </h1>
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

export default connect(mapStateToProps, { selectDevCategory })(TopBar);
