import React, { useState } from 'react';
import { connect } from 'react-redux';
import firebase from '../../config/firebase';

const Login = ({ close, setCrrShow }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /**
   * ログインフォームが送信された時の処理
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        close();
      })
      .catch((err) => {
        alert('ログインに失敗しました。:', err);
        console.log(err);
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
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <h3 className="ui header">ログイン</h3>

        <div className="field">
          <label>メールアドレス</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="E-mail"
            autoComplete="off"
          />
        </div>
        <div className="field">
          <label>パスワード</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="ui right aligned container">
          <button type="submit" className="ui button basic primary">
            ログイン
          </button>
          <button
            type="button"
            className="ui button basic negative"
            onClick={close}
          >
            キャンセル
          </button>
          <button
            type="button"
            className="ui button basic"
            onClick={changeSignup}
          >
            新規登録はこちら
          </button>
          <button
            type="button"
            className="ui button basic"
            onClick={changeResetpassword}
          >
            パスワードを忘れた方
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(Login);
