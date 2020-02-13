import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '@/store/slice';
import ChannelsList from '@/components/ChannelsList';
import MessagesList from '@/components/MessagesList';
import AdditionSection from '@/components/AdditionSection';
import ChannelTitle from '@/components/ChannelTitle';

const App = (props) => {
  const { gon, state, initState } = props;

  useEffect(() => {
    initState(gon);
  }, []);

  return (
    <>
      <div className="col-sm-4 col-md-3 col-lg-2 p-3 bg-dark">
        <ChannelsList channels={state.channels} currentChannelId={state.currentChannelId} />
      </div>
      <div className="col-sm-8 col-md-9 col-lg-10 d-flex flex-column vh-100">
        <ChannelTitle />
        <MessagesList messages={state.messages} currentChannelId={state.currentChannelId} />
        <AdditionSection />
      </div>
    </>
  );
};

const mapStateToProps = ({ state }) => ({ state });

const actionCreators = {
  initState: actions.initState,
};

export default connect(mapStateToProps, actionCreators)(App);
