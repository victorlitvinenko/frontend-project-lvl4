import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import actions from '@/store/actions';
import UserContext from '@/context';
import NewChannelDialog from '@/components/NewChannelDialog';

const ChannelsList = (props) => {
  const userName = useContext(UserContext);
  const [show, setShow] = useState(false);

  const {
    channels, currentChannelId, changeChannel, addChannel,
  } = props;

  const renderChannels = () => channels.map(({ id, name }) => (
    <button
      type="button"
      className={cn('btn btn-dark list-group-item text-left py-1 px-3 shadow-none text-white',
        {
          'bg-primary': id === currentChannelId,
          'bg-dark': id !== currentChannelId,
        })}
      key={id}
      onClick={() => changeChannel(id)}
    >
      <i className="fas fa-hashtag fa-xs mr-1 text-white-50" />
      {name}
    </button>
  ));

  const handleShow = async () => {
    await setShow(true);
    document.getElementById('addChannel').focus();
  };

  const closeModalDialog = () => setShow(false);

  const handleAddChannel = (name) => {
    addChannel(name);
    setShow(false);
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
          onClick={handleShow}
          className="my-3 btn btn-dark list-group-item text-left py-1 px-3 shadow-none text-white bg-dark"
          type="button"
        >
          <i className="fas fa-plus fa-xs mr-1 text-white-50" />
          Add a channel
        </button>
      </div>
      <NewChannelDialog
        show={show}
        closeModalDialog={closeModalDialog}
        addChannel={handleAddChannel}
      />
    </>
  );
};

const mapStateToProps = (state) => ({ state });

const actionCreators = {
  changeChannel: actions.changeChannel,
  addChannel: actions.addChannel,
};

export default connect(mapStateToProps, actionCreators)(ChannelsList);
