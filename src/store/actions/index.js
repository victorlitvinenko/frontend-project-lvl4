import * as channelsActions from '../reducers/channels';
import * as messagesActions from '../reducers/messages';
import * as currentChannelId from '../reducers/currentChannelId';
import * as errorActions from '../reducers/error';

export default {
  ...channelsActions,
  ...messagesActions,
  ...currentChannelId,
  ...errorActions,
};
