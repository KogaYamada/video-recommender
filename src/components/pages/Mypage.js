import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import CreateEditBar from '../CreateEditBar';
import MyVideoList from '../MyVideoList';
import Spiner from '../Spiner';
import firebase from '../../config/firebase';

const Mypage = () => {
  /**
   * ユーザーデータの参照
   */
  const user = useContext(AuthContext);
  const db = firebase.firestore();
  const [myVideoList, setMyVideoList] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection('userData').onSnapshot((snapshot) => {
        const videos = [];
        snapshot.docs.forEach((doc) => {
          // 現在のユーザーのデータのみ取得する
          if (doc.id === user.uid) {
            doc.data().recommendVideo.forEach((video) => {
              videos.push(video);
            });
            setMyVideoList(videos);
            console.log(doc.data());
          }
        });
      });
    }
  }, [user]);
  if (!user) {
    return <Spiner />;
  }

  return (
    <div>
      <CreateEditBar />
      <h2 className="ui icon center aligned header">
        <i className="address card icon"></i>
        <div className="content">
          マイページ
          <div className="sub header">
            ユーザー情報の設定と、オススメした動画の編集・削除ができます。
          </div>
        </div>
      </h2>
      <div className="ui container grid raised segment">
        <div className="nine wide column">
          <h2 className="ui center aligned grey segment">ユーザー情報</h2>
          <div className="ui basic segment">
            <h2 className="ui center aligned header">
              <i className="meh outline icon"></i>
              ユーザー名
            </h2>
            <h3 className="ui center aligned header">{user.displayName}</h3>
          </div>
          <div className="ui basic segment">
            <h2 className="ui center aligned header">
              <i className="envelope outline icon"></i>
              メールアドレス
            </h2>
            <h3 className="ui center aligned header">{user.email}</h3>
          </div>
        </div>
        <div className="seven wide column">
          <h3 className="ui center aligned grey segment">オススメしたビデオ</h3>
          {user ? <MyVideoList videoList={myVideoList} /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
