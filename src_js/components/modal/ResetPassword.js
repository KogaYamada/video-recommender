import React, { useState } from 'react';
import firebase from '../../config/firebase';
import { Grid, Form, Button, Header, Icon, Message } from 'semantic-ui-react';

const ResetPassword = ({ close }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  /**
   * パスワードリセットフォームが送信された時の処理
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(`${email}にメールを送信しました。`);
        setLoading(false);
      })
      .catch((err) => {
        alert(`メールの送信に失敗しました。：${err.message}`);
        setLoading(false);
      });
  };
  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          <Icon name="lock" />
          パスワードの再設定
        </Header>
        <Form onSubmit={handleSubmit}>
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
          <Message>
            登録済みのメールアドレスにパスワードの再設定を行うためのメールを送信します。
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
            className={loading ? 'loading' : ''}
            disabled={loading}
          >
            メールを送信
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default ResetPassword;
