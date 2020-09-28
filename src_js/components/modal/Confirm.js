import React, { useState } from 'react';
import { Button, Modal, Image, Header, Icon } from 'semantic-ui-react';

const ModalExampleCloseConfig = ({
  video,
  func,
  type,
  message,
  setComment,
  comment,
}) => {
  const [open, setOpen] = useState(false);
  const [closeOnEscape, setCloseOnEscape] = useState(null);
  const [closeOnDimmerClick, setCloseOnDimmerClick] = useState(null);

  const closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    setCloseOnEscape(closeOnEscape);
    setCloseOnDimmerClick(closeOnDimmerClick);
    setOpen(true);
  };
  const handleFunction = () => {
    func();
    setOpen(false);
  };

  const close = () => {
    setOpen(false);
  };

  const showIcon = (type) => {
    switch (type) {
      case 'delete':
        return (
          <div onClick={closeConfigShow(true, false)}>
            <div>
              削除
              <i className="right trash alternate outline icon" />
            </div>
          </div>
        );
      case 'recommend':
        return (
          <div onClick={closeConfigShow(true, false)}>
            <div>
              オススメする
              <i className="right trash alternate outline icon" />
            </div>
          </div>
        );
      case 'edit':
        return (
          <div onClick={closeConfigShow(true, false)}>
            <div>
              編集
              <i className="right edit outline icon" />
            </div>
          </div>
        );
      case 'ligout':
        return (
          <div>
            <div>
              ログアウト
              <i className="sign-out icon" />
            </div>
          </div>
        );
      default:
        return <div onClick={closeConfigShow(true, false)}>Button</div>;
    }
  };

  const renderedContent = () => {
    if (type === 'delete' || type === 'recommend') {
      return (
        <Modal.Description>
          <div className="content">
            <Header>動画のタイトル</Header>
            <div className="description">{video.title}</div>
            <Header>コメント</Header>
            <div className="description">{video.comment}</div>
          </div>
        </Modal.Description>
      );
    } else if (type === 'edit') {
      return (
        <Modal.Description>
          <div className="content">
            <Header>動画のタイトル</Header>
            <div className="description">{video.title}</div>
            <Header>コメント</Header>
            <div className="ui form">
              <div className="field">
                <textarea
                  style={{ width: '200px' }}
                  value={comment}
                  rows="3"
                  className="description"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Description>
      );
    }
  };

  return (
    <>
      {showIcon(type)}
      <Modal
        open={open}
        closeOnEscape={closeOnEscape}
        closeOnDimmerClick={closeOnDimmerClick}
        onClose={close}
      >
        <Modal.Header>オススメを{message}する</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={video.thumbnail} />
          {renderedContent()}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close} negative>
            キャンセル
          </Button>
          <Button
            onClick={handleFunction}
            positive
            labelPosition="right"
            icon="checkmark"
            content={`オススメを${message}`}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ModalExampleCloseConfig;
