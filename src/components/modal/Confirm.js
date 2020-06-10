import React, { useState } from 'react';
import { Button, Modal, Image, Header } from 'semantic-ui-react';

const ModalExampleCloseConfig = ({ video, func, comment, type, message }) => {
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
      default:
        return <div onClick={closeConfigShow(true, false)}>Button</div>;
    }
  };

  return (
    <div>
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
          <Modal.Description>
            <div className="content">
              <Header>動画のタイトル</Header>
              <div className="description">{video.title}</div>
              <Header>コメント</Header>
              <div className="description">{video.comment}</div>
            </div>
          </Modal.Description>
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
    </div>
  );
};

export default ModalExampleCloseConfig;
