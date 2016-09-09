import {connect} from 'react-redux';
import {removeMessage} from './messages-actions';
import {messageToDisplaySelector} from './messages-reducer';
import MessageCenter from './messages-component';
export default connect(
  messageToDisplaySelector,
  {deleteMessage: removeMessage}
)(MessageCenter);
