import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';

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
          <div>
            <div onClick={closeConfigShow(true, false)}>
              削除
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
        <Modal.Content>
          <p>{comment}</p>
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
