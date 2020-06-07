import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import CreateEditBar from '../CreateEditBar';

const Mypage = () => {
  const user = useContext(AuthContext);
  return (
    <div>
      <CreateEditBar />
      <div className="ui container grid">
        <div className="ten wide column">
          <h3 className="ui center aligned grey segment">ユーザー情報</h3>
        </div>
        <div className="six wide column">
          <h3 className="ui center aligned grey segment">オススメしたビデオ</h3>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
