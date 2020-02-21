import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Message = (props) => {
  const {
    message: {
      text, userName, date,
    },
  } = props;

  return (
    <div
      className="mb-2"
    >
      <strong>
        {userName}
      </strong>
      {' '}
      <small className="text-black-50">{formatDistanceToNow(new Date(date), { addSuffix: true })}</small>
      <div>{text}</div>
    </div>
  );
};

const MessagesList = (props) => {
  const { messages, currentChannelId } = props;

  const renderMessages = () => messages
    .filter((el) => el.channelId === currentChannelId)
    .map((message) => (
      <Message key={message.id} message={message} />
    ));

  return (
    <div className="d-flex flex-column pl-3 flex-grow-1 overflow-auto justify-content-end">
      <ScrollableFeed forceScroll>
        {renderMessages()}
      </ScrollableFeed>
    </div>
  );
};

export default MessagesList;
