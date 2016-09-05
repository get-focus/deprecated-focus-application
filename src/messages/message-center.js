import React , {PureComponent, PropTypes} from 'react';
import capitalize from 'lodash/capitalize';

function Message({id,content, title, deleteMessage}){
  return <li>{id} -  {title} - {content} <button onClick={() => deleteMessage({id: id})}>x</button></li>
}

class MessageWithTtl extends PureComponent{
  componentDidMount(){
    const {deleteMessage, id, ttl} = this.props;
    this.timeoutId = setTimeout(() => {
      deleteMessage({id})
    }, ttl)
  }
  componentWillUnmount(){
    clearTimeout(this.timeoutId);
  }
  render(){
    return <Message {...this.props} />
  }
}

MessageWithTtl.defaultProps = {
  ttl: 5000
};

export default function MessageCenter({messages,deleteMessage,type, ...otherProps}){
  return <ul data-focus='message-center'>
    {
      messages.map(
        msg => <MessageWithTtl key={msg.id} {...msg} ttl={otherProps[`ttl${capitalize(type)}`]} deleteMessage={deleteMessage}/>
      )
    }
  </ul>;
}
MessageCenter.propTypes = {
  messages: PropTypes.array.isRequired,
  deleteMessage: PropTypes.func.isRequired
}
MessageCenter.defaultProps = {
  messages: [],
  ttlInfo: 10000,
  ttlSuccess: 5000
}
