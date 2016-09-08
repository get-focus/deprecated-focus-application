import {connect} from 'react-redux';
import {removeMessage} from './messages-actions';
import {messagesSelector} from './messages-reducer';
import MessageCenter from './messages-component';
export default connect(
  messagesSelector,
  {deleteMessage: removeMessage}
)(MessageCenter);
