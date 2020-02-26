import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ChannelsList from '@/components/ChannelsList';
import MessagesList from '@/components/MessagesList';
import MessageInput from '@/components/MessageInput';
import ChannelHeader from '@/components/ChannelHeader';
import { Alert } from '@/components/Dialogs';
import connect from '@/connect';

const App = (props) => {
  const { setNotification } = props;
  const {
    channels: { data: channels, currentChannelId },
    messages, notification,
  } = useSelector((state) => state);

  const findChannel = (id) => channels.find((channel) => channel.id === id);
  const [currentChannel, setCurrentChannel] = useState(findChannel(currentChannelId));
  useEffect(() => {
    setCurrentChannel(findChannel(currentChannelId));
  }, [currentChannelId, channels]);
  const currentMessages = messages.filter((el) => el.channelId === currentChannelId);

  return (
    <>
      <div className="col-sm-4 col-md-3 col-lg-2 bg-dark p-0">
        <ChannelsList channels={channels} currentChannelId={currentChannelId} />
      </div>
      <div className="col-sm-8 col-md-9 col-lg-10 d-flex flex-column p-0 flex-grow-1 overflow-auto">
        <ChannelHeader currentChannel={currentChannel} />
        <MessagesList messages={currentMessages} />
        <MessageInput currentChannelName={currentChannel.name} />
      </div>
      <Alert notification={notification} onClose={() => setNotification('')} />
    </>
  );
};

export default connect()(App);
