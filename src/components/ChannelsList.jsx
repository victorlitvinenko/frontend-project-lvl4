import React, { useContext } from 'react';
import UserContext from '../UserContext';

const ChannelsList = (props) => {
  const { channels } = props;
  const userName = useContext(UserContext);

  return (
    <div className="list-group">
      {
          channels.map(({ id, name }) => (
            <a href={`#${id}`} className="list-group-item list-group-item-action" key={id}>{name}</a>
          ))
        }
      {userName}
    </div>
  );
};

export default ChannelsList;
