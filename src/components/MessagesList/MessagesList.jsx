import React from 'react';

const MessagesList = (props) => {
  const { messages } = props;

  const renderMessages = () => messages.map(({
    id, message, userName,
  }) => (
    <div
      className="list-group-item"
      key={id}
    >
      <strong>
        {userName}
        :
      </strong>
      {' '}
      {message}
    </div>
  ));

  return (
    <div className="card my-3 flex-grow-1 overflow-auto">
      <div className="card-body p-3">
        {renderMessages()}
      </div>
    </div>
  );
};

export default MessagesList;
