import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { connect } from 'react-redux';
import { selectVideo, setVideos, isSearch } from '../../_actions';
import {
  Dropdown,
  Header,
  Icon,
  Segment,
  Grid,
  Form,
  Input,
  Container,
  Button,
  Label,
} from 'semantic-ui-react';
import VideoList from '../VideoList';
import VideoDetail from '../VideoDetail';
import CreateEditBar from '../TopBars/CreateEditBar';
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
  /**
   * 検索するキーワード
   */
  const [term, setTerm] = useState('');
  /**
   * 動画のオススメする時のコメント
   */
  const [description, setDescription] = useState('');
  /**
   * ドロップダウンメニューの選択されたカテゴリー
   */
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
   * userDataコレクションの参照
   */
  const userDataRef = db.collection('userData');
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
    //youtube APIにリクエストを送信
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 9,
        key: KEY,
      },
    });
    // youtube APIから送られてきたデータの処理
    selectVideo(response.data.items[0]);
    setVideos(response.data.items);
    //検索状態をtrueに変更
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
    const categoryName = `${category}Recommend`;
    db.collection(categoryName)
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
    const categoryName = `${category}Recommend`;
    db.collection(categoryName)
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
  const submitRecommend = async (event) => {
    event.preventDefault();
    if (description.length <= 0) {
      alert('一文字以上入力してください');
      return;
    }
    // -----------------------------------[START VALIDATION]---------------------------------------
    // カテゴリーが入力されていない場合関数から抜け出す
    if (!category) {
      alert('カテゴリーを選択してください');
      return;
    }
    // チャンネルを追加したい場合など、データベースに必要なデータが揃っていない時には関数から抜け出す
    if (
      !video.id.videoId ||
      !video.snippet.title ||
      !video.snippet.description ||
      !video.snippet.thumbnails.medium.url
    ) {
      alert('追加できる動画ではありません');
      return;
    }
    /**
     * ユーザーが動画を既にオススメに登録しているか検証
     * 登録済みで動画データがreturn
     * 未登録でundefinedがreturn
     */
    const sameVideo = await userDataRef
      .doc(user.uid)
      .get()
      .then((doc) => {
        return doc.data().recommendVideo.find((videoItem) => {
          return videoItem.videoId === video.id.videoId;
        });
      });
    //既にユーザーがオススメに登録していればアラートを表示して関数から抜け出す
    if (sameVideo) {
      alert('既にオススメに登録しています。');
      return;
    }
    // 他のユーザーが既に動画をオススメに登録しているか検証
    // 登録済みでupdateRecommend関数を実行してオススメコメントのみ追加
    // 未登録でaddRecommend関数を実行して動画をオススメコメントを追加
    const categoryName = `${category}Recommend`;
    db.collection(categoryName)
      .get()
      .then((docs) => {
        // documentのid一覧の配列を作る
        const ids = [];
        docs.forEach((doc) => {
          ids.push(doc.id);
        });
        // 配列の中に今回追加する動画のidがないかを判定する(既に動画がお勧めされているかをチェック)
        if (ids.includes(video.id.videoId)) {
          // 既に動画がオススメされていればコメントのみ更新
          updateRecommend();
        } else {
          // まだ動画がオススメされていなければ新しく作成
          addRecommend();
        } //----------------------------------------[END VALIDATION]----------------------------------------
        // ユーザーのオススメした動画に追加
        userDataRef.doc(user.uid).update({
          recommendVideo: firebase.firestore.FieldValue.arrayUnion({
            category,
            comment: description,
            thumbnail: video.snippet.thumbnails.medium.url,
            title: video.snippet.title,
            videoId: video.id.videoId,
          }),
        });
      });
    setDescription('');
    alert('オススメ動画を追加しました。');
  };
  /**
   * ドロップダウンが変更された時にその値をcategoryに入れる
   */
  const changeCategory = (e, { value }) => {
    setCategory(value);
  };
  /**
   * ビデオの詳細をレンダリングする関数
   */
  const detailRender = () => {
    return (
      <Segment raised>
        <Grid stackable>
          <Grid.Column width={10} style={{ marginLeft: '10px' }}>
            <Segment>
              <VideoDetail />
            </Segment>
            <Form onSubmit={submitRecommend}>
              <Segment>
                <Header as="h3">
                  <Icon color="red" name="youtube play" />
                  <Header.Content>ビデオタイトル</Header.Content>
                  {video.snippet.title}
                </Header>
                <Dropdown
                  placeholder="カテゴリー"
                  id="dropdown"
                  onChange={changeCategory}
                  options={options}
                  selection
                />
                <Form.TextArea
                  label="オススメコメント"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  rows="5"
                />
              </Segment>
              <Button
                content="オススメに登録"
                type="submit"
                size="huge"
                primary
              />
            </Form>
          </Grid.Column>
          <Grid.Column width={5}>
            <VideoList />
          </Grid.Column>
        </Grid>
      </Segment>
    );
  };
  return (
    <>
      <CreateEditBar />
      <Header as="h2" className="ui icon center aligned header">
        <Icon name="youtube" />
        動画をオススメする
        <Header.Subheader>
          動画を検索してオススメに追加してください。
        </Header.Subheader>
      </Header>
      <Container text>
        <Segment>
          <Form className="ui form" onSubmit={onFormSubmit}>
            <label>オススメする動画を検索</label>
            <Input
              fluid
              icon="search"
              iconPosition="left"
              placeholder="search..."
              onChange={(e) => {
                setTerm(e.target.value);
              }}
              type="text"
            />
          </Form>
        </Segment>
      </Container>
      <div>{video ? detailRender() : ''}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { video: state.selectedVideo, isSearchState: state.isSearch };
};

export default connect(mapStateToProps, { selectVideo, setVideos, isSearch })(
  RecommendCreate
);
