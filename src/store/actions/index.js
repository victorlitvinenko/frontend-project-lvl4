import * as channelsActions from '../reducers/channels';
import * as messagesActions from '../reducers/messages';
import * as messageSendingStatus from '../reducers/messageSendingStatus';
import * as currentChannelId from '../reducers/currentChannelId';
import * as notificationActions from '../reducers/notification';

export default {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelId,
  ...notificationActions,
  ...messageSendingStatus,
};
