import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const RenameChannelDialog = (props) => {
  const {
    show, handleClose, renameChannel, channelName,
  } = props;

  const [value, setValue] = useState(channelName);

  useEffect(() => { setValue(channelName); }, [channelName]);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleRenameChannel = () => {
    renameChannel(value);
    // setValue('');
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleRenameChannel();
    }
  };

  const handleCloseRenameDialog = () => {
    setValue(channelName);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseRenameDialog}>
      <Modal.Header closeButton>
        <Modal.Title>
          Rename channel #
          {channelName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          id="renameChannel"
          name="renameChannel"
          value={value}
          onChange={(e) => handleChange(e)}
          onKeyPress={handleKeyPress}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseRenameDialog}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleRenameChannel}
        >
          Rename
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelDialog;
