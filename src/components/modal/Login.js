import React, { useState } from 'react';
import { connect } from 'react-redux';
import firebase from '../../config/firebase';
import {
  Grid,
  Form,
  Button,
  Header,
  Segment,
  Icon,
  Message,
} from 'semantic-ui-react';

const Login = ({ close, setCrrShow }) => {
  /**
   * 入力されたメールアドレスの値
   */
  const [email, setEmail] = useState('');
  /**
   * 入力されたパスワードの値
   */
  const [password, setPassword] = useState('');
  /**
   * 入力の値を送信した時にボタンをロード中にするためのstate
   */
  const [loading, setLoading] = useState(false);
  /**
   * ログインフォームが送信された時の処理
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    // ボタンのロード状態をonに変更
    setLoading(true);
    // ログインの処理
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // ボタンのロード状態をoffに変更
        setLoading(false);
        //モーダルを閉じる
        close();
      })
      .catch((err) => {
        // ログインに失敗した時にアラートでユーザーに伝える
        alert(`ログインに失敗しました。：${err.message}`);
        // ボタンのロード状態をoffに変更
        setLoading(false);
      });
  };
  /**
   * サインアップフォームをレンダリングする関数
   */
  const changeSignup = () => {
    setCrrShow('signup');
  };
  /**
   * パスワードリセットフォームをレンダリングする関数
   */
  const changeResetpassword = () => {
    setCrrShow('resetpass');
  };
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          <Icon name="user circle" />
          ログイン
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
          </Segment>
          <Message>
            新規登録は
            <a style={{ cursor: 'pointer' }} href onClick={changeSignup}>
              こちら
            </a>
          </Message>
          <Message>
            パスワードを忘れた方は
            <a style={{ cursor: 'pointer' }} href onClick={changeResetpassword}>
              こちら
            </a>
          </Message>
          <Button
            color="google plus"
            type="button"
            disabled={loading}
            onClick={close}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            primary
            style={{ width: '110px' }}
            className={loading ? 'loading' : ''}
            disabled={loading}
          >
            ログイン
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Login);
