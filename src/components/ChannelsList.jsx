import React from 'react';
import UserContext from '../UserContext';

class ChannelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { channels } = this.props;

    return (
      <div className="list-group">
        {
          channels.map(({ id, name }) => (
            <a href={`#${id}`} className="list-group-item list-group-item-action" key={id}>{name}</a>
          ))
        }
        {this.context}
      </div>
    );
  }
}

ChannelsList.contextType = UserContext;

export default ChannelsList;
