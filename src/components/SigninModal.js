import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import Login from './Login';
import Signup from './Signup';

class ModalExampleCloseConfig extends Component {
  state = { open: false };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };
  close = () => this.setState({ open: false });

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
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
              <Signup close={this.close} />
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
              <Login close={this.close} />
            </Modal.Content>
          </Modal>
        </div>
      );
    };

    return <div>{signupRender()}</div>;
  }
}

export default ModalExampleCloseConfig;
