import React from 'react';

const ChannelsList = (props) => {
  const { channels } = props;
  return (
    <div className="list-group">
      {
        channels.map(({ id, name }) => (
          <a href={`#${id}`} className="list-group-item list-group-item-action" key={id}>{name}</a>
        ))
      }
    </div>
  );
};

export default ChannelsList;
