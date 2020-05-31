import React, { useState } from 'react';
import firebase from '../config/firebase';
import history from '../history';

const Signup = ({ setRenderForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, passwordConfirm, username);
    history.push('/');
  };
  const onCancel = () => {
    setRenderForm(null);
  };

  return (
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
      <div>
        <button type="submit" className="ui button positive">
          登録
        </button>
        <button type="submit" className="ui button negative" onClick={onCancel}>
          キャンセル
        </button>
      </div>
    </form>
  );
};

export default Signup;
