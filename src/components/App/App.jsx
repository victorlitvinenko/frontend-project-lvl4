import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import actions from '@/store/actions';
import ChannelsList from '@/components/ChannelsList';
import MessagesList from '@/components/MessagesList';
import AdditionSection from '@/components/AdditionSection';
import ChannelTitle from '@/components/ChannelTitle';
import Alert from '@/components/Alert';

const App = (props) => {
  const {
    state: {
      channels, messages, currentChannelId, error,
    },
    setError,
  } = props;

  const findChannel = (id) => channels.find((channel) => channel.id === id);
  const [currentChannel, setCurrentChannel] = useState(findChannel(currentChannelId));

  useEffect(() => {
    setCurrentChannel(findChannel(currentChannelId));
  }, [currentChannelId, channels]);

  return (
    <>
      <div className="col-sm-4 col-md-3 col-lg-2 bg-dark p-0">
        <ChannelsList channels={channels} currentChannelId={currentChannelId} />
      </div>
      <div className="col-sm-8 col-md-9 col-lg-10 d-flex flex-column vh-100 p-0">
        <ChannelTitle currentChannel={currentChannel} />
        <MessagesList messages={messages} currentChannelId={currentChannelId} />
        <AdditionSection currentChannelName={currentChannel.name} />
      </div>
      <Alert show={error} onClose={() => setError(false)} />
    </>
  );
};

const mapStateToProps = (state) => ({ state });

const actionCreators = {
  setError: actions.setError,
};

export default connect(mapStateToProps, actionCreators)(App);
