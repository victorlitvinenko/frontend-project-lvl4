import React from 'react';
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

export default Message;
