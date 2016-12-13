import React, {PropTypes, PureComponent} from 'react';
import i18next from 'i18next';
import capitalize from 'lodash/capitalize';

class Message extends PureComponent {
    render() {
        const {content, deleteMessage, messageId, title} = this.props;
        return (
            <div data-focus='message'>
                <span>{messageId}</span>
                <span>{i18next.t(title)}</span>
                <span>{i18next.t(content)}</span>
                <button onClick={deleteMessage}>x</button>
            </div>
        );
    }
};
Message.displayName = 'Message';
Message.propTypes = {
    content: PropTypes.string.isRequired,
    deleteMessage: PropTypes.func,
    messageId: PropTypes.string.isRequired,
    title: PropTypes.string
}


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
MessageWithTtl.displayName = 'MessageWithTtl';
MessageWithTtl.PropTypes = {
    ttl: PropTypes.number,
    MessageComponent: PropTypes.func
};
MessageWithTtl.defaultProps = {
    ttl: 5000,
    MessageComponent: Message
};


export default class MessageCenter extends PureComponent {
    render() {
        const {deleteMessage, MessageComponent, messages, ...otherProps} = this.props;
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
};
MessageCenter.propTypes = {
    deleteMessage: PropTypes.func.isRequired,
    MessageComponent: PropTypes.func,
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
