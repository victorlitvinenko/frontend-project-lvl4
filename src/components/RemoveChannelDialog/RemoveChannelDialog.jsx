import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RemoveChannelDialog = (props) => {
  const {
    show, handleClose, channelName, handleRemoveChannel,
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Remove #
          {channelName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleRemoveChannel}
        >
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelDialog;
