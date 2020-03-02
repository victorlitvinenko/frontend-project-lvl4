import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import {
  Modal, Button, Form, Toast,
} from 'react-bootstrap';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.select();
    }
  };
  return [htmlElRef, setFocus];
};

export const NewChannelDialog = (props) => {
  const [value, setValue] = useState('');
  const [inputRef, setInputFocus] = useFocus();
  const { show, closeModalDialog, addChannel } = props;

  useEffect(setInputFocus, [show]);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleAddChannel = () => {
    addChannel(value.trim());
    setValue('');
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13 && value.trim() !== '') {
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
          ref={inputRef}
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
          variant="success"
          disabled={value.trim() === ''}
          onClick={handleAddChannel}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const RemoveChannelDialog = (props) => {
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

export const RenameChannelDialog = (props) => {
  const {
    show, handleClose, renameChannel, channelName,
  } = props;

  const [value, setValue] = useState(channelName);

  const [inputRef, setInputFocus] = useFocus();

  useEffect(setInputFocus, [show]);
  useEffect(() => { setValue(channelName); }, [channelName]);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleRenameChannel = () => {
    renameChannel(value.trim());
    setValue(value.trim());
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13 && value.trim() !== '') {
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
          ref={inputRef}
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
          variant="success"
          disabled={value.trim() === ''}
          onClick={handleRenameChannel}
        >
          Rename
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const Alert = (props) => {
  const { notification, onClose } = props;

  return (
    <Toast
      style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      }}
      className={cn({ 'd-none': notification === '' })}
      onClose={onClose}
      show={notification !== ''}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <i className="fas fa-square mr-1 text-danger" />
        <strong className="mr-auto">Mini Slack</strong>
      </Toast.Header>
      <Toast.Body>{notification}</Toast.Body>
    </Toast>
  );
};
