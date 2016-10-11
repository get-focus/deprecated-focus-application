export const TRIGGER_POSITION_HEADER = 'Header: TRIGGER_POSITION_HEADER';
export const EXPAND_HEADER = 'Header: EXPAND_HEADER';
export const UNEXPAND_HEADER = 'Header: UNEXPAND_HEADER';
export const INJECT_BAR_CONTENT_LEFT_HEADER = 'Header: INJECT_BAR_CONTENT_LEFT_HEADER';
export const INJECT_BAR_CONTENT_SUMMARY_HEADER = 'Header: INJECT_BAR_CONTENT_SUMMARY_HEADER';
export const INJECT_BAR_CONTENT_RIGHT_HEADER = 'Header: INJECT_BAR_CONTENT_RIGHT_HEADER';
export const INJECT_BAR_CONTENT_EXPANDED_HEADER = 'Header: INJECT_BAR_CONTENT_EXPANDED_HEADER';
export const INJECT_ACTIONS_HEADER = 'Header: INJECT_ACTIONS_HEADER';
export const DEFAULT_TRIGGER_POSITION = 0;

export function expandHeader() {
    return {type: EXPAND_HEADER};
}

export function unExpandHeader() {
    return {type: UNEXPAND_HEADER};
}

export function triggerPosition(value = DEFAULT_TRIGGER_POSITION) {
    return {type: TRIGGER_POSITION_HEADER, value};
}

export function injectBarContentLeftHeader(Component) {
    return {type: INJECT_BAR_CONTENT_LEFT_HEADER, Component};
}

export function injectBarContentRightHeader(Component) {
    return {type: INJECT_BAR_CONTENT_RIGHT_HEADER, Component};
}

export function injectBarContentSummaryHeader(Component) {
    return {type: INJECT_BAR_CONTENT_SUMMARY_HEADER, Component};
}

export function injectBarContentExpandedHeader(Component) {
    return {type: INJECT_BAR_CONTENT_EXPANDED_HEADER, Component};
}

export function injectActionHeader(actions){
    return {type: INJECT_ACTIONS_HEADER, actions};
}
