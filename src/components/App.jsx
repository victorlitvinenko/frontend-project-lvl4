import React from 'react';
import ChannelsList from './ChannelsList';

const App = (props) => {
  const { channels } = props;
  return (
    <div className="row">
      <div className="col-sm-4 col-md-3 mb-3">
        <ChannelsList channels={channels} />
      </div>
      <div className="col-sm-8 col-md-9 d-flex flex-column">
        <div className="card mb-3 flex-grow-1">
          <div className="card-body" />
        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Message" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
