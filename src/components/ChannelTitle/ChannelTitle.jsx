import React, { useState } from 'react';
import { connect } from 'react-redux';

import actions from '@/store/actions';
import RemoveChannelDialog from '@/components/RemoveChannelDialog';
import RenameChannelDialog from '@/components/RenameChannelDialog';

const ChannelTitle = (props) => {
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const { currentChannel, removeChannel, renameChannel } = props;

  const handleRemoveChannel = () => {
    removeChannel(currentChannel.id);
    setShowRemoveDialog(false);
  };
  const handleRenameChannel = (newName) => {
    renameChannel(currentChannel.id, newName);
    setShowRenameDialog(false);
  };
  const handleShowRenameDialog = async () => {
    await setShowRenameDialog(true);
    document.getElementById('renameChannel').focus();
    document.getElementById('renameChannel').select();
  };

  const closeRemoveDialog = () => setShowRemoveDialog(false);
  const closeRenameDialog = () => setShowRenameDialog(false);

  const renderButtons = () => {
    if (!currentChannel.removable) return null;
    return (
      <div className="col col-auto my-auto">
        <button
          type="button"
          className="btn btn-danger mr-2"
          onClick={() => setShowRemoveDialog(true)}
        >
          <i className="fas fa-trash-alt mr-2" />
          Remove
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleShowRenameDialog}
        >
          <i className="fas fa-pen mr-2" />
          Rename
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="p-3 border-bottom bg-light">
        <div className="row">
          <div className="col">
            <h3 className="m-0">
              <i className="fas fa-hashtag fa-xs text-black-50" />
              {currentChannel.name}
            </h3>
          </div>
          {renderButtons()}
        </div>
      </div>
      <RemoveChannelDialog
        show={showRemoveDialog}
        channelName={currentChannel.name}
        handleRemoveChannel={handleRemoveChannel}
        handleClose={closeRemoveDialog}
      />
      <RenameChannelDialog
        show={showRenameDialog}
        channelName={currentChannel.name}
        closeRenameDialog={closeRenameDialog}
        renameChannel={handleRenameChannel}
      />
    </>
  );
};

const mapStateToProps = (state) => ({ state });

const actionCreators = {
  removeChannel: actions.removeChannel,
  renameChannel: actions.renameChannel,
};

export default connect(mapStateToProps, actionCreators)(ChannelTitle);
