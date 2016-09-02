import React , {PropTypes} from 'react';
import capitalize from 'lodash/capitalize';

function Message({id,content, title, handleTimeToLeave}){
  return <li>{id} -  {title} - {content} <button onClick={() => handleTimeToLeave({id: id})}>x</button></li>
}

export default function MessageCenter({messages,deleteMessage,type, ...otherProps}){
  return <ul data-focus='message-center'>
    {
      messages.map(
        msg => <Message key={msg.id} {...msg} ttl={otherProps[`ttl${capitalize(type)}`]} handleTimeToLeave={deleteMessage}/>
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
