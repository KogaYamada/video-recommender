import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';

class ModalExampleCloseConfig extends Component {
  state = { open: false, crrShow: 'login' };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };
  /**
   * this.state.crrShowを更新する関数
   */
  setCrrShow = (state) => {
    this.setState({ crrShow: state });
  };
  /**
   * モーダルを閉じる関数
   */
  close = () => {
    this.setCrrShow('login');
    this.setState({ open: false });
  };

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    /**
     * レンダリングする内容を決める関数
     */
    const showModal = (body) => {
      switch (body) {
        case 'login':
          return loginRender();
        case 'signup':
          return signupRender();
        case 'resetpass':
          return ResetPasswordRender();
        default:
          return;
      }
    };
    /**
     * サインアップのレンダリング処理
     */
    const signupRender = () => {
      return (
        <div>
          <div onClick={this.closeConfigShow(true, false)}>
            ログイン/サインアップ
          </div>

          <Modal
            open={open}
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            onClose={this.close}
            size="small"
          >
            <Modal.Header>サインアップ</Modal.Header>
            <Modal.Content>
              <Signup close={this.close} setCrrShow={this.setCrrShow} />
            </Modal.Content>
          </Modal>
        </div>
      );
    };
    /**
     * ログインのレンダリング処理
     */
    const loginRender = () => {
      return (
        <div>
          <div onClick={this.closeConfigShow(true, false)}>
            ログイン/サインアップ
          </div>

          <Modal
            open={open}
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            onClose={this.close}
            size="small"
          >
            <Modal.Header>ログイン</Modal.Header>
            <Modal.Content>
              <Login close={this.close} setCrrShow={this.setCrrShow} />
            </Modal.Content>
          </Modal>
        </div>
      );
    };
    /**
     * パスワードリセットのレンダリング処理
     */
    const ResetPasswordRender = () => {
      return (
        <div>
          <div onClick={this.closeConfigShow(true, false)}>
            パスワードの再設定
          </div>

          <Modal
            open={open}
            closeOnEscape={closeOnEscape}
            closeOnDimmerClick={closeOnDimmerClick}
            onClose={this.close}
            size="small"
          >
            <Modal.Header>パスワードの再設定</Modal.Header>
            <Modal.Content>
              <ResetPassword close={this.close} setCrrShow={this.setCrrShow} />
            </Modal.Content>
          </Modal>
        </div>
      );
    };

    return <div>{showModal(this.state.crrShow)}</div>;
  }
}

export default ModalExampleCloseConfig;
