import { connect } from 'react-redux';
import { actions, asyncActions } from './slices';

export default () => (Component) => connect(null, { ...actions, ...asyncActions })(Component);
