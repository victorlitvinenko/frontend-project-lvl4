import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';

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
    <div className="d-flex flex-column my-3 flex-grow-1 overflow-auto">
      <ScrollableFeed forceScroll>
        {/* <div className="card-body p-3"> */}
        {renderMessages()}
        {/* </div> */}
      </ScrollableFeed>
    </div>
  );
};

export default MessagesList;
