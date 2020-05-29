import React from 'react';

const TopBar = ({ categorys, setCategorys }) => {
  /**
   * TopBarのアクティブパネルの切り替え用の関数
   */
  const colorChangeTopBar = (event) => {
    event.preventDefault();
    const categorysRef = categorys; //state変更用の変数
    const items = document.querySelectorAll('.item');
    for (const el of items) {
      el.classList.remove('active');
    }

    // isActiveを全てfalseにする
    categorysRef.forEach((el, index) => {
      if (el.isActive) {
        categorysRef[index].isActive = false;
      }
    });
    // クリックした要素のisActiveをtrueにする
    categorysRef.forEach((el, index) => {
      if (el.title === event.target.textContent) {
        categorysRef[index].isActive = true;
      }
    });

    setCategorys(categorysRef); //変更を適用する
    event.target.classList.add('active'); // クリックした要素にactiveクラスを追加
  };

  /**
   * レンダリングされるカテゴリーをpropsのcategorysを元に生成。
   */
  const renderedCategorys = categorys.map((el, index) => {
    const classRight = index === 0 ? 'right' : '';
    const classActive = el.isActive ? 'active' : '';

    return (
      <a
        href="/"
        onClick={colorChangeTopBar}
        className={`${el.color} item ${classRight} ${classActive}`}
      >
        {el.title}
      </a>
    );
  });

  return (
    <div>
      <div className="ui massive inverted menu">
        <h2 style={{ color: 'white' }}>Video category</h2>
        {renderedCategorys}
      </div>
    </div>
  );
};

export default TopBar;
