import React from 'react';
import cn from 'classnames';
import Toast from 'react-bootstrap/Toast';

const Alert = (props) => {
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

export default Alert;
