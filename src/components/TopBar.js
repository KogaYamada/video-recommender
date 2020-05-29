import React from 'react';
import { connect } from 'react-redux';
import { selectDevCategory } from '../actions';

class TopBar extends React.Component {
  changeActive = (event) => {
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
    this.props.devCategorys.forEach((category) => {
      if (category.isActive) {
        category.isActive = false;
      }
    });

    // クリックした要素のisActiveをtrueにする
    this.props.devCategorys.forEach((category) => {
      if (category.title === event.target.textContent) {
        category.isActive = true;
      }
    });
    event.target.classList.add('active'); // クリックした要素にactiveクラスを追加
    console.log(this.props);
  };

  /**
   * カテゴリー一覧をレンダリングする関数
   */
  renderTopBar = () => {
    return this.props.devCategorys.map((category, index) => {
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
          onClick={this.changeActive}
          className={`${category.color} item ${classRight} ${classActive}`}
        >
          {category.title}
        </a>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="ui massive inverted menu">
          <h2 style={{ color: 'white' }}>Video category</h2>
          {this.renderTopBar()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedDevCategory: state.selectedDevCategory,
    devCategorys: state.devCategorys,
  };
};

export default connect(mapStateToProps, { selectDevCategory })(TopBar);
