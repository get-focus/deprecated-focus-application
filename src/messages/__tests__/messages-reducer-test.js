import messageCenterReducer from '../reducer';

const st1 = messageCenterReducer([], {type: 'PUSH_MESSAGE', message: {id: "msg1", content: "blabla"} })
const st2 = messageCenterReducer(st1, {type: 'PUSH_MESSAGE', message: {id: "msg2", content: "blablas"} })
const st3 = messageCenterReducer(st2, {type: 'PUSH_MESSAGE', message: {id: "msg3", content: "blablas"} })
const st4 = messageCenterReducer(st3, {type: 'REMOVE_MESSAGE', message: {id: "msg3"}})

console.log('messages', {st1,st2,st3,st4})
