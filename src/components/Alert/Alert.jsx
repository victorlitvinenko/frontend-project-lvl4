import React from 'react';
import cn from 'classnames';
import Toast from 'react-bootstrap/Toast';

const Alert = (props) => {
  const { show, onClose } = props;

  return (
    <Toast
      style={{ position: 'fixed', top: 0, right: 0 }}
      className={cn({ 'd-none': !show })}
      onClose={onClose}
      show={show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <i className="fas fa-square mr-1 text-danger" />
        <strong className="mr-auto">Mini Slack</strong>
        {/* <small>right now</small> */}
      </Toast.Header>
      <Toast.Body>Network connection error!</Toast.Body>
    </Toast>
  );
};

export default Alert;
