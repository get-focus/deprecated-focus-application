import React , {PureComponent, PropTypes} from 'react';
import i18next from 'i18next';
import capitalize from 'lodash/capitalize';

function Message({messageId, content, title, deleteMessage}){
    return (
        <div data-focus='message'>
            <span>{messageId}</span>
            <span>{i18next.t(title)}</span>
            <span>{i18next.t(content)}</span>
            <button onClick={() => deleteMessage({id: id})}>x</button>
        </div>
    );
};

class MessageWithTtl extends PureComponent {
    componentDidMount() {
        const {deleteMessage, id, ttl} = this.props;
        this.timeoutId = setTimeout(() => {
            deleteMessage({id})
        }, ttl);
    }
    componentWillUnmount() {
        clearTimeout(this.timeoutId);
    }
    render() {
        const {MessageComponent, ...otherMessageProps} = this.props;
        return <MessageComponent {...otherMessageProps} />
    }
};
MessageWithTtl.defaultProps = {
    ttl: 5000,
    MessageComponent: Message
};

export default function MessageCenter({MessageComponent, messages, deleteMessage, ...otherProps}){
    return (
        <div data-focus='message-center'>
            {messages.map((msg) => {
                const messageTtl = msg.ttl ? msg.ttl : otherProps[`ttl${capitalize(msg.type)}`];
                const {id} = msg;
                return (
                    <MessageWithTtl key={msg.id} ttl={messageTtl} {...msg} messageId={id} deleteMessage={deleteMessage} MessageComponent={MessageComponent} />
                );
            })}
        </div>
    );
};
MessageCenter.propTypes = {
    deleteMessage: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    ttlInfo: PropTypes.number,
    ttlError: PropTypes.number,
    ttlWarning: PropTypes.number,
    ttlSuccess: PropTypes.number
};
MessageCenter.defaultProps = {
    messages: [],
    MessageComponent: Message,
    ttlInfo: 5000,
    ttlError: 10000,
    ttlWarning: 10000,
    ttlSuccess: 5000
};
