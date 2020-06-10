import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Redirect } from 'react-router-dom';
import Confirm from './modal/Confirm';
import firebase from '../config/firebase';

const MyVideoItem = ({ video, videoList }) => {
  /**
   * ユーザーデータの参照
   */
  const user = useContext(AuthContext);
  const db = firebase.firestore();
  const videoDataRef = db.collection(`${video.category}Recommend`);
  const deleteVideo = async () => {
    /**
     * ユーザーがオススメしたビデオの中で削除するビデオ以外の配列を生成
     */
    const deleteVideoRef = videoList.filter((videoItem) => {
      return videoItem.videoId !== video.videoId;
    });
    /**
     * userDataのオススメ動画を削除
     */
    db.collection('userData').doc(user.uid).update({
      recommendVideo: deleteVideoRef,
    });
    /**
     * category別のオススメ動画からauthorを削除した配列を生成
     */
    const deleteAuthorRef = await videoDataRef
      .doc(video.videoId)
      .get()
      .then((data) => {
        return data.data().author.filter((author) => {
          return author.userId !== user.uid;
        });
      });

    if (deleteAuthorRef.length === 0) {
      // category別のオススメ動画から削除
      videoDataRef
        .doc(video.videoId)
        .delete()
        .then(() => {
          console.log('オススメから削除！');
        });
    } else {
      // 残ったauthorをfirestoreに更新
      videoDataRef.doc(video.videoId).update({
        author: deleteAuthorRef,
      });
    }
  };
  /**
   * video.categoryの値から色を割り当てる関数
   */
  const colorChecker = (category) => {
    switch (category) {
      case 'javascript':
        return 'yellow';
      case 'node':
        return 'green';
      case 'deno':
        return 'violet';
      case 'react':
        return 'blue';
      case 'vue':
        return 'teal';
      case 'angular':
        return 'red';
      case 'other':
        return 'grey';
      default:
        return;
    }
  };
  const color = colorChecker(video.category);
  return (
    <div className="item">
      <div className="image">
        <div className="ui fluid image">
          <div className={`ui ${color} tiny ribbon label`}>
            {video.category}
          </div>
          <img alt="thumbnail" src={video.thumbnail} />
        </div>
      </div>
      <div className="content">
        <div>
          <h3 className="ui header">{video.title}</h3>
        </div>
        <div className="extra">
          <div className="small ui right floated negative button">
            <Confirm
              video={video}
              type="delete"
              comment="おはよう"
              message="削除"
              func={deleteVideo}
            />
          </div>
          <div className="small ui right floated primary button">
            編集
            <i className="right edit outline icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVideoItem;
