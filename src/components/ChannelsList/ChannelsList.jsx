import React, { useContext } from 'react';
import cn from 'classnames';

import UserContext from '@/context';

const ChannelsList = (props) => {
  const { channels, currentChannelId } = props;
  const userName = useContext(UserContext);

  const renderChannels = () => channels.map(({ id, name }) => (
    <a
      href={`#${id}`}
      className={cn('list-group-item list-group-item-action', { active: id === currentChannelId })}
      key={id}
    >
      {name}
    </a>
  ));

  return (
    <>
      <h1 className="text-white mb-0">Slack</h1>
      <div className="text-white-50">
        <i className="fas fa-circle fa-xs text-success mr-1" />
        {userName}
      </div>
      <div className="list-group mt-3">
        {renderChannels()}
      </div>
    </>
  );
};

export default ChannelsList;
