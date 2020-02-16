import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { connect } from 'react-redux';

import actions from '@/store/actions';
import ChannelsList from '@/components/ChannelsList';
import MessagesList from '@/components/MessagesList';
import AdditionSection from '@/components/AdditionSection';
import ChannelTitle from '@/components/ChannelTitle';

const App = (props) => {
  const {
    state: {
      channels, messages, currentChannelId, error,
    },
    setError,
  } = props;

  return (
    <>
      <div className="col-sm-4 col-md-3 col-lg-2 p-3 bg-dark">
        <ChannelsList channels={channels} currentChannelId={currentChannelId} />
      </div>
      <div className="col-sm-8 col-md-9 col-lg-10 d-flex flex-column vh-100">
        <ChannelTitle />
        <MessagesList messages={messages} currentChannelId={currentChannelId} />
        <AdditionSection />
      </div>
      <Toast
        style={{ position: 'fixed', top: 0, right: 0 }}
        onClose={() => setError(false)}
        show={error}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <i className="fas fa-square mr-1 text-danger" />
          <strong className="mr-auto">Mini Slack</strong>
          {/* <small>right now</small> */}
        </Toast.Header>
        <Toast.Body>Network connection error!</Toast.Body>
      </Toast>
    </>
  );
};

const mapStateToProps = (state) => ({ state });

const actionCreators = {
  setError: actions.setError,
};

export default connect(mapStateToProps, actionCreators)(App);
