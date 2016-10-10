import {
    EXPAND_HEADER,
    UNEXPAND_HEADER,
    INJECT_BAR_CONTENT_LEFT_HEADER,
    INJECT_BAR_CONTENT_SUMMARY_HEADER,
    INJECT_BAR_CONTENT_RIGHT_HEADER,
    INJECT_BAR_CONTENT_EXPANDED_HEADER,
    TRIGGER_POSITION_HEADER,
    INJECT_ACTIONS_HEADER,
    DEFAULT_TRIGGER_POSITION
} from './header-actions';

export function headerSelector(state = {}){
    return state.header;
}
export function headerIsExpandedSelector(state = {}){
    return {isExpanded: state.header.isExpanded, triggerPosition: state.header.triggerPosition};
}
/** Header reducer, deal with the expanded state of the header and all the injected components*/
function headerReducer(state = {triggerPosition: DEFAULT_TRIGGER_POSITION}, action = {}){
    switch (action.type) {
        case TRIGGER_POSITION_HEADER:
        return {...state, triggerPosition: action.value}
        case EXPAND_HEADER:
        return {...state, isExpanded: true};
        case UNEXPAND_HEADER:
        return {...state, isExpanded: false};
        case INJECT_BAR_CONTENT_LEFT_HEADER:
        return {...state, BarContentLeft: action.Component};
        case INJECT_BAR_CONTENT_RIGHT_HEADER:
        return {...state, BarContentRight: action.Component};
        case INJECT_BAR_CONTENT_SUMMARY_HEADER:
        return {...state, BarContentSummary: action.Component, lastUpdate: +new Date()};
        case INJECT_BAR_CONTENT_EXPANDED_HEADER:
        return {...state, BarContentExpanded: action.Component, lastUpdate: +new Date()};
        case INJECT_ACTIONS_HEADER:
        return {...state, actions: action.actions};
        default:
        return state;
    }
}

export default headerReducer;
