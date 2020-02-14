import * as channelsActions from '../reducers/channels';
import * as messagesActions from '../reducers/messages';
import * as currentChannelId from '../reducers/currentChannelId';

export default {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelId,
};
