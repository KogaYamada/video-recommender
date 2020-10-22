import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import CreateEditBar from '../TopBars/CreateEditBar';
import MyVideoList from '../MyVideoList';
import Spiner from '../Spiner';
import firebase from '../../config/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  Segment,
  Button,
  Icon,
  Header,
  Grid,
  Container,
} from 'semantic-ui-react';

const Mypage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [myVideoList, setMyVideoList] = useState([]);
  const [isChangeName, setIsChangeName] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  /**
   * ユーザーデータの参照
   */
  const user = useContext(AuthContext);
  const db = firebase.firestore();
  const [value, loading, error] = useCollection(
    db.collection('/version/v1/drafts'),
    {}
  );
  /**--------------------------------------------------------------------------------------------------
   * ユーザーネームをレンダリングする関数
   */
  const renderedName = () => {
    return (
      <Segment basic>
        <Header as="h2" textAlign="center">
          <Icon name="meh outline" />
          ユーザー名
        </Header>
        <Header as="h3" textAlign="center">
          {user.displayName}
          <Button
            style={{ marginLeft: '10px' }}
            size="small"
            onClick={() => {
              setIsChangeName(true);
            }}
          >
            変更
          </Button>
        </Header>
      </Segment>
    );
  };
  /**--------------------------------------------------------------------------------------------------
   * ユーザーネームを変更するフォームをレンダリングする関数
   */
  const renderedChangeName = () => {
    /**
     * ユーザーネームの変更を行う関数
     */
    const changeName = async (event) => {
      event.preventDefault();
      if (userName.length <= 0) {
        alert('一文字以上入力してください');
        return;
      }
      /**
       * firebase auth側のdisplayNameを変更
       */
      user.updateProfile({ displayName: userName });
      //ユーザーがオススメしている動画の名前を変更する処理
      /**
       * ユーザーが過去にオススメした動画を配列で受け取る。
       * 配列の中はオブジェクトで、オススメした動画のidとカテゴリー参照用にある。
       */
      const recommendVideoDatas = await db
        .collection('userData')
        .doc(user.uid)
        .get()
        .then((doc) => {
          return doc.data().recommendVideo.map((el) => {
            return { id: el.videoId, category: el.category };
          });
        });
      // 過去に動画をオススメしたことがあればその動画の名前を更新する
      if (recommendVideoDatas.length > 0) {
        // recommendVideoDatas(過去のオススメした動画)をforEachで一つずつ名前を変更していく
        recommendVideoDatas.forEach(async (videoData) => {
          /**
           * 動画をオススメしている人のリストを配列で取得
           */
          const authorList = await db
            .collection(`${videoData.category}Recommend`)
            .doc(videoData.id)
            .get()
            .then((doc) => {
              return doc.data().author;
            });
          /**
           * 変更するauthorを特定
           */
          const authorIndex = authorList.findIndex((author) => {
            return author.userId === user.uid;
          });
          // 変更するユーザーのuserNameを入力された新しいuserNameに変更
          authorList[authorIndex].userName = userName;
          // 変更したデータをfirestoreに更新
          db.collection(`${videoData.category}Recommend`)
            .doc(videoData.id)
            .update({
              author: authorList,
            });
        });
      }
      // userDataコレクションのユーザーの名前を変更
      db.collection('userData').doc(user.uid).update({ name: userName });
      // マイページの表示状態を変更（名前変更→名前表示）
      setIsChangeName(false);
      alert('名前を変更しました');
    };

    return (
      <h3 className="ui center aligned header">
        <form className="ui form" onSubmit={changeName}>
          <div className="field">
            <input
              style={{ width: '50%' }}
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <button
            style={{ marginLeft: '10px' }}
            className="ui small right negative button"
            onClick={(e) => {
              e.preventDefault();
              setIsChangeName(false);
            }}
          >
            キャンセル
          </button>
          <button
            style={{ marginLeft: '10px' }}
            className="ui small right primary button"
          >
            変更を確定
          </button>
        </form>
      </h3>
    );
  };
  /**--------------------------------------------------------------------------------------------------
   * メールアドレスをレンダリングする関数
   */
  const renderedEmail = () => {
    return (
      <Segment basic>
        <Header as="h2" textAlign="center">
          <Icon name="envelope outline" />
          メールアドレス
        </Header>
        <Header as="h3" textAlign="center">
          {user.email}
          <Button
            size="small"
            onClick={() => {
              setIsChangeEmail(true);
            }}
            style={{ marginLeft: '10px' }}
          >
            変更
          </Button>
        </Header>
      </Segment>
    );
  };
  /**--------------------------------------------------------------------------------------------------
   * メールアドレスを変更するフォームをレンダリングする関数
   */
  const renderedChangeEmail = () => {
    /**
     * メールアドレスを再設定する関数
     */
    const changeEmail = (event) => {
      event.preventDefault();
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, password)
        .then((userCredential) => {
          userCredential.user
            .updateEmail(email)
            .then(() => {
              setIsChangeEmail(false);
              alert('メールアドレスを変更しました');
            })
            .catch((error) => {
              alert('メールアドレスの登録に失敗しました');
            });
        });
    };
    return (
      <h3 className="ui center aligned header">
        <form className="ui form" onSubmit={changeEmail}>
          <div className="field">
            <label>メールアドレス</label>
            <input
              style={{ width: '50%' }}
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <label>パスワード</label>
          <div className="field">
            <input
              style={{ width: '50%' }}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            style={{ marginLeft: '10px' }}
            className="ui small right negative button"
            onClick={(e) => {
              e.preventDefault();
              setIsChangeEmail(false);
            }}
          >
            キャンセル
          </button>
          <button
            style={{ marginLeft: '10px' }}
            className="ui small right primary button"
          >
            変更を確定
          </button>
        </form>
      </h3>
    );
  };
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
          }
        });
        setMyVideoList(videos);
        setUserName(user.displayName);
        setEmail(user.email);
      });
    }
  }, [user]);
  if (!user) {
    return <Spiner />;
  }

  return (
    <>
      <CreateEditBar />
      <Header as="h2" className="ui icon center aligned header">
        <Icon name="address card" />
        マイページ
        <Header.Subheader>
          ユーザー情報の設定と、オススメした動画の編集・削除ができます。
        </Header.Subheader>
      </Header>
      <Segment as={Container}>
        <Grid stackable>
          <Grid.Column width={9}>
            <Segment color="grey" textAlign="center">
              <Header as="h3">ユーザー情報</Header>
            </Segment>
            {isChangeName ? renderedChangeName() : renderedName()}
            {isChangeEmail ? renderedChangeEmail() : renderedEmail()}
          </Grid.Column>
          <Grid.Column width={7}>
            <h3 className="ui center aligned grey segment">
              オススメしたビデオ
            </h3>
            {user ? <MyVideoList videoList={myVideoList} /> : ''}
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
};

export default Mypage;
