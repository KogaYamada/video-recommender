import React, { useState } from 'react';
import firebase from '../../config/firebase';
import { connect } from 'react-redux';
import {
  Grid,
  Form,
  Button,
  Header,
  Segment,
  Icon,
  Message,
} from 'semantic-ui-react';

const Signup = ({ close, setCrrShow }) => {
  /**
   * 入力されたユーザーネームの値
   */
  const [username, setUsername] = useState('');
  /**
   * 入力されたメールアドレスの値
   */
  const [email, setEmail] = useState('');
  /**
   * 入力されたパスワードの値
   */
  const [password, setPassword] = useState('');
  /**
   * 入力されたパスワード再確認の値
   */
  const [passwordConfirm, setPasswordConfirm] = useState('');
  /**
   * 入力の値を送信した時にボタンをロード中にするためのstate
   */
  const [loading, setLoading] = useState(false);
  /**
   * フォームに入力された内容を検証してtrue又はfalseを返す。
   */
  const isFormValid = () => {
    if (formEnpty(username, email, password, passwordConfirm)) {
      // フォームが１つでも空の時
      // アラートで注意
      alert('全て入力してください');
      return false;
    } else if (!isPasswordValid(password, passwordConfirm)) {
      // パスワードと再確認パスワードの値が違う時
      // アラートで注意
      alert('パスワードが一致しません');
      return false;
    } else {
      //フォームの入力内容問題ない場合trueを返す
      return true;
    }
  };
  /**
   * 入力されたフォームの文字が空かどうか判断する関数。
   * どこか１か所でも空のフォームがあればtrueを返す。
   * @param {String} username フォームのusername入力された値
   * @param {String} email フォームのemailに入力された値
   * @param {String} password フォームのpasswordに入力された値
   * @param {String} passwordConfirm フォームのpasswordConfrmに入力された値
   */
  const formEnpty = (username, email, password, passwordConfirm) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirm.length
    );
  };
  /**
   * パスワードに入力された値を検証する関数。
   * 入力された文字が５文字以下かパスワード(password)と再確認パスワード(passwordConfirm)の値が不一致でfalseを返す。
   * @param {String} password フォームのpasswordに入力された値
   * @param {String} passwordConfirm フォームのpasswordConfrmに入力された値
   */
  const isPasswordValid = (password, passwordConfirm) => {
    if (password.length < 6 || passwordConfirm.length < 6) {
      return false;
    } else if (password !== passwordConfirm) {
      return false;
    } else {
      return true;
    }
  };
  /**
   * サインアップフォームが送信された時の処理。
   * isFormValid関数で入力した内容が問題なければfirebaseにアカウント設定を試みる。
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    //isFormValidで検証した結果trueならサインアップを実行する。
    if (isFormValid()) {
      // ボタンのロード状態をonに変更
      setLoading(true);
      // 入力されたemailとpasswordでサインアップを実行する。
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          /**
           * 作成されたユーザーの情報
           */
          const userdata = createdUser.user;
          // 入力されたusernameをfirebase authのdisplayNameに設定する。
          userdata.updateProfile({ displayName: username }).then(() => {
            // firebase firestoreにユーザーデータを保存する
            firebase
              .firestore()
              .collection('userData')
              .doc(userdata.uid)
              .set({
                id: userdata.uid,
                name: userdata.displayName,
                recommendVideo: [],
              })
              .then(() => {
                // ボタンのロード状態をoffに変更
                setLoading(false);
                close();
              });
          });
        })
        .catch((err) => {
          // アカウントの作成に失敗したことをユーザーに伝える。
          alert(`アカウントの作成に失敗しました。：${err.message}`);
          // ロード状態をoffに変更
          setLoading(false);
        });
    }
  };
  /**
   * サインアップフォームをレンダリングする関数
   */
  const changeLogin = () => {
    setCrrShow('login');
  };
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          <Icon name="address book outline" />
          アカウントを作成
        </Header>
        <Form onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="メールアドレス"
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="パスワード"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="パスワード(再確認)"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              type="password"
            />
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="ユーザー名"
              autoComplete="off"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
            />
          </Segment>
          <Message>
            既にアカウントをお持ちの方
            <span
              style={{
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underLine',
              }}
              onClick={changeLogin}
            >
              ログイン
            </span>
          </Message>
          <Button
            primary
            style={{ width: '110px' }}
            type="submit"
            className={loading ? 'loading' : ''}
            disabled={loading}
          >
            登録
          </Button>
          <Button
            color="google plus"
            disabled={loading}
            type="button"
            onClick={close}
          >
            キャンセル
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default connect(null)(Signup);
