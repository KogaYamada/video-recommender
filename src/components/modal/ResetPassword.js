import React, { useState } from 'react';
import firebase from '../../config/firebase';

const ResetPassword = ({ close }) => {
  const [email, setEmail] = useState('');
  /**
   * パスワードリセットフォームが送信された時の処理
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('再設定メールを送信しました。:', email);
        console.log('再設定メールの送信');
      })
      .catch((err) => {
        alert('メールの送信に失敗しました。:', err);
        console.log(err);
      });
  };
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <h3 className="ui header">パスワード再設定</h3>
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
        <button type="submit" className="ui button basic primary">
          再設定メールを送信する
        </button>
        <button
          type="button"
          className="ui button basic negative"
          onClick={close}
        >
          キャンセル
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
