import React, { useState } from 'react';
import { connect } from 'react-redux';
import firebase from '../config/firebase';
import { signIn } from '../actions';

const Login = ({ close, changeHaveAcount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <h3 className="ui header">サインアップ</h3>

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
            onClick={changeHaveAcount}
          >
            新規登録はこちら
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, signIn)(Login);
