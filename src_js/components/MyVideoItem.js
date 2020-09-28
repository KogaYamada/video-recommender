import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Confirm from './modal/Confirm';
import firebase from '../config/firebase';

const MyVideoItem = ({ video, videoList }) => {
  const [comment, setComment] = useState('');
  /**
   * ユーザーデータの参照
   */
  const user = useContext(AuthContext);
  /**
   * videoのカテゴリーコレクションの参照
   */
  const videoDataRef = firebase
    .firestore()
    .collection(`${video.category}Recommend`)
    .doc(video.videoId);
  const userDataRef = firebase.firestore().collection('userData').doc(user.uid);
  /**
   * videoをオススメした動画から削除する関数
   */
  const deleteRecommend = async () => {
    /**
     * ユーザーがオススメしたビデオの中で削除するビデオ以外の配列を生成
     */
    const deleteVideoRef = videoList.filter((videoItem) => {
      return videoItem.videoId !== video.videoId;
    });
    /**
     * userDataのオススメ動画を削除
     */
    userDataRef.update({
      recommendVideo: deleteVideoRef,
    });
    /**
     * category別のオススメ動画からauthorを削除した配列を生成
     */
    const deleteAuthorRef = await videoDataRef.get().then((data) => {
      return data.data().author.filter((author) => {
        return author.userId !== user.uid;
      });
    });

    if (deleteAuthorRef.length === 0) {
      // category別のオススメ動画から削除
      videoDataRef.delete().then(() => {
        console.log('オススメから削除！');
      });
    } else {
      // 残ったauthorをfirestoreに更新
      videoDataRef.update({
        author: deleteAuthorRef,
      });
    }
  };
  const editRecomend = async () => {
    //-------- userData collectionのコメント更新---------
    /**
     * userDataに保存しているオススメした動画一覧を取得
     */
    const userVideos = await userDataRef.get().then((doc) => {
      return doc.data().recommendVideo;
    });
    /**
     * 今回変更する動画のインデックス番号を取得
     */
    const userIndex = userVideos.findIndex((videoItem) => {
      return videoItem.videoId === video.videoId;
    });
    // userDataのオススメした動画のコメントを変更
    userVideos[userIndex].comment = comment;
    // firestoreのuserDataのオススメコメントを更新
    userDataRef.update({ recommendVideo: userVideos });

    // ----------- categoryRecommendのコメント更新--------------
    /**
     * categoryRecommendに保存されているauthor一覧を取得
     */
    const authors = await videoDataRef.get().then((doc) => {
      return doc.data().author;
    });
    /**
     * 今回変更するauthorのインデックス番号を取得
     */
    const authorIndex = authors.findIndex((author) => {
      return author.userId === user.uid;
    });
    // categoryRecommendのauthorを特定してコメントを変更
    authors[authorIndex].comment = comment;
    videoDataRef.update({ author: authors });

    // アラートで報告
    alert('コメントを変更しました');
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
  useEffect(() => {
    if (user) {
      videoDataRef.get().then(async (doc) => {
        const author = await doc.data().author.find((el) => {
          return el.userId === user.uid;
        });
        setComment(author.comment);
      });
    }
  }, [user]);
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
              message="削除"
              func={deleteRecommend}
            />
          </div>
          <div className="small ui right floated primary button">
            <Confirm
              video={video}
              type="edit"
              message="編集"
              func={editRecomend}
              setComment={setComment}
              comment={comment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyVideoItem;
