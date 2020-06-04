import React, { useState } from 'react';
import firebase from '../config/firebase';
import { connect } from 'react-redux';

const Signup = ({ close, changeHaveAcount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({ displayName: username });
        // signIn(firebase.auth().currentUser);
      })
      .catch((err) => {
        console.log(err);
      });
    close();
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
        {/* <div className="field">
        <label>パスワード(再確認)</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
      </div> */}
        <div className="field">
          <label>ユーザー名</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="ui right aligned container">
          <button type="submit" className="ui button basic primary">
            登録
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
            アカウントをお持ちの方
          </button>
        </div>
      </form>
    </div>
  );
};

export default connect(null)(Signup);
