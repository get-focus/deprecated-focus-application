import React , {PureComponent, PropTypes} from 'react';
import capitalize from 'lodash/capitalize';

function Message({id,content, title, deleteMessage, i18nTranslation}){
  return <li>{id} -  {i18nTranslation(title)} - {i18nTranslation(content)} <button onClick={() => deleteMessage({id: id})}>x</button></li>
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
    const {MessageComponent,i18nTranslation, ...otherMessageProps} = this.props;
    return <MessageComponent  i18nTranslation={i18nTranslation}  {...otherMessageProps} />
  }
}

MessageWithTtl.defaultProps = {
  ttl: 5000,
  MessageComponent: Message
};

export default function MessageCenter({MessageComponent, messages,deleteMessage,type,i18nTranslation, ...otherProps}){
  return <ul data-focus='message-center'>
    {
      messages.map(
        msg => <MessageWithTtl key={msg.id} {...msg} ttl={otherProps[`ttl${capitalize(type)}`]} deleteMessage={deleteMessage} i18nTranslation={i18nTranslation} MessageComponent={MessageComponent}/>
      )
    }
  </ul>;
}
MessageCenter.propTypes = {
  messages: PropTypes.array.isRequired,
  i18nTranslation: PropTypes.func,
  deleteMessage: PropTypes.func.isRequired
}
MessageCenter.defaultProps = {
  messages: [],
  ttlInfo: 10000,
  i18nTranslation: props=> props,
  ttlSuccess: 5000,
  MessageComponent: Message
}
