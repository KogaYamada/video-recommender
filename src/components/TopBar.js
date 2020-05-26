import React from 'react';

const TopBar = ({ setCategory }) => {
  /**
   * TopBarのアクティブパネルの切り替え用の関数
   */
  const colorChangeTopBar = (event) => {
    const menus = document.querySelectorAll('.item');
    menus.forEach((el) => {
      el.classList.remove('active');
    });
    // クリックした要素にactiveクラスを追加
    event.target.classList.add('active');
    // クリックした要素のタイトルをcategoryにセット
    setCategory(event.target.innerHTML);
  };
  return (
    <div>
      <div className="ui inverted menu">
        <h2 style={{ color: 'white' }}>Video category</h2>
        <a onClick={colorChangeTopBar} className="yellow right item active">
          JavaScript
        </a>
        <a onClick={colorChangeTopBar} className="green item ">
          Node.js
        </a>
        <a onClick={colorChangeTopBar} className="blue item">
          React/React Native
        </a>
        <a onClick={colorChangeTopBar} className="teal item">
          Vue.js
        </a>
        <a onClick={colorChangeTopBar} className="orange item">
          Orange
        </a>
        <a onClick={colorChangeTopBar} className="olive item">
          Teal
        </a>
      </div>
    </div>
  );
};

export default TopBar;
