import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { connect } from 'react-redux';
import { selectVideo, setVideos } from '../../actions';
import { Dropdown, Input } from 'semantic-ui-react';
import VideoList from '../VideoList';
import firebase from '../../config/firebase';
import youtube from '../../config/youtube';

const KEY = 'AIzaSyAfub-68QTWGpc5-_LqzSWjb5q9vS_A2SQ';

const RecommendCreate = ({ video, setVideos, selectVideo }) => {
  const [term, setTerm] = useState('');
  const db = firebase.firestore();
  const user = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
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
        maxResults: 7,
        key: KEY,
      },
    });
    selectVideo(response.data.items[0]);
    setVideos(response.data.items);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    onTermSubmit(term);
  };
  const submitRecommend = (event) => {
    event.preventDefault();
    db.collection(category)
      .doc()
      .set({
        comment: description,
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
  const changeCategory = (e, { value }) => {
    setCategory(`${value}Recommend`);
  };
  const detailRender = () => {
    return (
      <div>
        <div>
          <div className="videoWrap">
            <div className="ui embed">
              <iframe title="video player" />
            </div>
          </div>
          <div className="VideoWrap">
            <VideoList />
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
        <button
          onClick={() => {
            console.log('コメント', description);
            console.log('タイトル', video.snippet.title);
            console.log('説明', video.snippet.description);
            console.log('ID', video.id.videoId);
            console.log('サムネ', video.snippet.thumbnails.medium.url);
            console.log('ユーザー', user.displayName);
            console.log('カテゴリー', category);
          }}
        >
          確認
        </button>
      </div>
    );
  };
  return (
    <div className="ui container">
      <h2 className="ui icon center aligned header">
        <i className="youtube icon"></i>
        <div className="content">
          動画をオススメする
          <div className="sub header">
            Manage your account settings and set e-mail preferences.
          </div>
        </div>
      </h2>
      <div className="search-bar ui segment">
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
  return { video: state.selectedVideo };
};

export default connect(mapStateToProps, { selectVideo, setVideos })(
  RecommendCreate
);
