import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { connect } from 'react-redux';
import { selectVideo, setVideos, isSearch } from '../../actions';
import { Dropdown } from 'semantic-ui-react';
import VideoList from '../VideoList';
import VideoDetail from '../VideoDetail';
import CreateEditBar from '../CreateEditBar';
import firebase from '../../config/firebase';
import youtube from '../../config/youtube';

const KEY = 'AIzaSyAfub-68QTWGpc5-_LqzSWjb5q9vS_A2SQ';

const RecommendCreate = ({
  video,
  setVideos,
  selectVideo,
  isSearch,
  isSearchState,
}) => {
  const [term, setTerm] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  /**
   * firebase firestoreの参照
   */
  const db = firebase.firestore();
  /**
   * ユーザーの情報。AuthContextからグローバルに状態を管理
   */
  const user = useContext(AuthContext);
  /**
   * ドロップダウメニューの内容
   */
  const options = [
    { key: 1, text: 'JavaScript', value: 'javascript' },
    { key: 2, text: 'Node.js', value: 'node' },
    { key: 3, text: 'Deno', value: 'deno' },
    { key: 4, text: 'React/React Native', value: 'react' },
    { key: 5, text: 'Vue.js', value: 'vue' },
    { key: 6, text: 'Angular.js', value: 'angular' },
    { key: 7, text: 'OTher', value: 'other' },
  ];

  /**
   * 検索の処理
   */
  const onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 10,
        key: KEY,
      },
    });
    selectVideo(response.data.items[0]);
    setVideos(response.data.items);
    isSearch(true);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    onTermSubmit(term);
  };
  /**
   * firestoreに新しくオススメの動画を追加する関数
   */
  const addRecommend = () => {
    db.collection(category)
      .doc(video.id.videoId)
      .set({
        author: firebase.firestore.FieldValue.arrayUnion({
          userName: user.displayName,
          userId: user.uid,
          comment: description,
        }),
        id: { videoId: video.id.videoId },
        snippet: {
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnails: {
            medium: {
              url: video.snippet.thumbnails.medium.url,
            },
          },
        },
      })
      .then(() => {
        console.log('追加！');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /**
   * オススメする動画が既にオススメされている時の処理。
   * ユーザー情報とコメントのみ追加。
   */
  const updateRecommend = () => {
    db.collection(category)
      .doc(video.id.videoId)
      .update({
        author: firebase.firestore.FieldValue.arrayUnion({
          userName: user.displayName,
          userId: user.uid,
          comment: description,
        }),
        id: { videoId: video.id.videoId },
        snippet: {
          title: video.snippet.title,
          description: video.snippet.description,
          thumbnails: {
            medium: {
              url: video.snippet.thumbnails.medium.url,
            },
          },
        },
      })
      .then(() => {
        console.log('追加！');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * おすすめフォームが送信された時の処理
   */
  const submitRecommend = (event) => {
    event.preventDefault();
    db.collection(category)
      .get()
      .then((docs) => {
        // documentのid一覧の配列を作る
        const ids = [];
        docs.forEach((doc) => {
          ids.push(doc.id);
        });
        // 配列の中に今回追加する動画のidがないかを判定する(既に動画がお勧めされているかをチェック)
        if (ids.includes(video.id.videoId)) {
          updateRecommend();
        } else {
          addRecommend();
        }
      });
  };
  /**
   * ドロップダウンが変更された時にその値をcategoryに入れる
   */
  const changeCategory = (e, { value }) => {
    setCategory(`${value}Recommend`);
  };
  /**
   * ビデオの詳細をレンダリングする関数
   */
  const detailRender = () => {
    return (
      <div className="ui grid segment">
        <div className="ten wide column" style={{ marginLeft: '10px' }}>
          <div className="ui segment">
            <div>
              <VideoDetail />
            </div>
          </div>
          <form onSubmit={submitRecommend} className="ui form">
            <div className="ui segment">
              <div>
                <h3 className="ui header">{`ビデオタイトル:${video.snippet.title}`}</h3>
              </div>
              <div>
                <label>カテゴリー</label>
                <Dropdown
                  onChange={changeCategory}
                  id="dropdown"
                  clearable
                  options={options}
                  selection
                />
              </div>
              <div className="field">
                <label>コメント</label>
                <textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  rows="5"
                />
              </div>
            </div>
            <button type="submit" className="ui button primary">
              オススメに登録
            </button>
          </form>
        </div>
        <div className="five wide column">
          <VideoList />
        </div>
      </div>
    );
  };
  return (
    <div>
      <CreateEditBar />
      <h2 className="ui icon center aligned header">
        <i className="youtube icon"></i>
        <div className="content">
          動画をオススメする
          <div className="sub header">
            Manage your account settings and set e-mail preferences.
          </div>
        </div>
      </h2>
      <div className="search-bar ui segment text container">
        <form className="ui form" onSubmit={onFormSubmit}>
          <div className="field">
            <label>Video search</label>
            <input
              type="text"
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              placeholder="Search..."
            />
          </div>
        </form>
      </div>
      <div>{video ? detailRender() : ''}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { video: state.selectedVideo, isSearchState: state.isSearch };
};

export default connect(mapStateToProps, { selectVideo, setVideos, isSearch })(
  RecommendCreate
);
