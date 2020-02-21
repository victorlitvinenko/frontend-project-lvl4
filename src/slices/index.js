import { combineReducers } from 'redux';

import channels, { actions as channelsActions, asyncActions as channelsAsyncActions } from './channels';
import messages, { actions as messagesActions, asyncActions as messagesAsyncActions } from './messages';
import notification, { actions as notificationActions, asyncActions as notificationAsyncActions } from './notification';

export default combineReducers({
  channels,
  messages,
  notification,
});

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...notificationActions,
};

const asyncActions = {
  ...channelsAsyncActions,
  ...messagesAsyncActions,
  ...notificationAsyncActions,
};

export {
  actions,
  asyncActions,
};
