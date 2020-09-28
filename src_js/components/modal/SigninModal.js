import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';

const ModalExampleCloseConfig = () => {
  /**
   * モーダルの開閉状態を管理するstate
   */
  const [isOpen, setIsOpen] = useState(false);
  /**
   * 現在モーダルにレンダリングしているコンポーネントを管理するstate
   */
  const [crrentShow, setCrrentShow] = useState('login');
  const [closeOnEscape, setCloseOnEscape] = useState(false);
  const [closeOnDimmerClick, setCloseOnDimmerClick] = useState(true);
  /**
   * モーダルトリガーが押された時の処理
   * @param {boolean} closeOnEscape
   * @param {boolean} closeOnDimmerClick
   */
  const closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    setCloseOnEscape(closeOnEscape);
    setCloseOnDimmerClick(closeOnDimmerClick);
    setIsOpen(true);
  };
  /**
   * モーダルを閉じる関数
   */
  const close = () => {
    setCrrentShow('login');
    setIsOpen(false);
  };

  /**
   * レンダリングする内容を決める関数
   * @param {String}レンダリングする内容を振り分けるキーワード
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
        <div onClick={closeConfigShow(true, false)}>ログイン/サインアップ</div>
        <Modal
          open={isOpen}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={close}
          size="small"
        >
          <Modal.Content>
            <Signup close={close} setCrrShow={setCrrentShow} />
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
        <div onClick={closeConfigShow(true, false)}>ログイン/サインアップ</div>
        <Modal
          open={isOpen}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={close}
          size="small"
        >
          <Modal.Content>
            <Login close={close} setCrrShow={setCrrentShow} />
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
        <div onClick={closeConfigShow(true, false)}>パスワードの再設定</div>

        <Modal
          open={isOpen}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={close}
          size="small"
        >
          <Modal.Content>
            <ResetPassword close={close} setCrrShow={setCrrentShow} />
          </Modal.Content>
        </Modal>
      </div>
    );
  };

  return <div>{showModal(crrentShow)}</div>;
};

export default ModalExampleCloseConfig;
