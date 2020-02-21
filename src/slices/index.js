import { combineReducers } from 'redux';

import channels, { actions as channelsActions, asyncActions as channelsAsyncActions } from './channels';
import currentChannelId, { actions as currentChannelIdActions, asyncActions as currentChannelIdAsyncActions } from './currentChannelId';
import messages, { actions as messagesActions, asyncActions as messagesAsyncActions } from './messages';
import notification, { actions as notificationActions, asyncActions as notificationAsyncActions } from './notification';

export default combineReducers({
  channels,
  currentChannelId,
  messages,
  notification,
});

const actions = {
  ...channelsActions,
  ...currentChannelIdActions,
  ...messagesActions,
  ...notificationActions,
};

const asyncActions = {
  ...channelsAsyncActions,
  ...currentChannelIdAsyncActions,
  ...messagesAsyncActions,
  ...notificationAsyncActions,
};

export {
  actions,
  asyncActions,
};
