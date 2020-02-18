import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const NewChannelDialog = (props) => {
  const { show, closeModalDialog, addChannel } = props;

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleAddChannel = () => {
    addChannel(value);
    setValue('');
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleAddChannel();
    }
  };

  const handleClose = () => {
    setValue('');
    closeModalDialog();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          id="addChannel"
          name="addChannel"
          value={value}
          onChange={(e) => handleChange(e)}
          onKeyPress={handleKeyPress}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleAddChannel}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewChannelDialog;
