import React, { useContext, useState } from 'react';
import connect from '@/connect';
import cn from 'classnames';

import UserContext from '@/context/UserContext';
import { NewChannelDialog } from '@/components/Dialogs';

const Channel = (props) => {
  const { current, name, changeChannel } = props;
  const channelClass = cn('btn btn-dark list-group-item text-left py-1 px-3 shadow-none text-white',
    {
      'bg-primary': current,
      'bg-dark': !current,
    });
  return (
    <button
      type="button"
      className={channelClass}
      onClick={changeChannel}
    >
      <i className="fas fa-hashtag fa-xs mr-1 text-white-50" />
      {name}
    </button>
  );
};

const ChannelsList = (props) => {
  const userName = useContext(UserContext);
  const [isNewDialogVisible, setNewDialogVisibility] = useState(false);
  const {
    channels, currentChannelId, changeChannel, addChannel,
  } = props;

  const renderChannels = () => channels.map(({ id, name }) => {
    const isCurrentChannel = id === currentChannelId;
    return (
      <Channel
        key={id}
        current={isCurrentChannel}
        name={name}
        changeChannel={() => changeChannel(id)}
      />
    );
  });

  const handleAddChannel = (name) => {
    addChannel(name);
    setNewDialogVisibility(false);
  };

  return (
    <>
      <div className="p-3">
        <h2 className="text-white mb-0">Mini Slack</h2>
        <div className="text-white-50">
          <i className="fas fa-circle fa-xs text-success mr-1" />
          {userName}
        </div>
      </div>
      <div className="list-group list-group-flush">
        {renderChannels()}
        <button
          onClick={() => setNewDialogVisibility(true)}
          className="my-3 btn btn-dark list-group-item text-left py-1 px-3 shadow-none text-white bg-dark"
          type="button"
        >
          <i className="fas fa-plus fa-xs mr-1 text-white-50" />
          Add a channel
        </button>
      </div>
      <NewChannelDialog
        show={isNewDialogVisible}
        closeModalDialog={() => setNewDialogVisibility(false)}
        addChannel={handleAddChannel}
      />
    </>
  );
};

export default connect()(ChannelsList);
