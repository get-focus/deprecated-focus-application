import React, {PropTypes, PureComponent} from 'react';
import {
    injectActionHeader,
    injectBarContentExpandedHeader,
    injectBarContentLeftHeader,
    injectBarContentRightHeader,
    injectBarContentSummaryHeader,
    triggerPosition
} from '../header/header-actions';
import {compose} from 'redux';
import {connect as connectToState} from 'react-redux';

const Empty = () => (<span />);

export const connect = (headerOptions) => {
    const {actions = null, ExpandedHeaderComponent = null, SummaryHeaderComponent = null, LeftHeaderComponent = null, RightHeaderComponent = null, triggerScrollPosition = 9999} = headerOptions || {};
    const isStaticHeader = triggerScrollPosition === 0 || ExpandedHeaderComponent === null;
    return (ComponentToConnect) => {
        class ConnectedToHeaderComponent extends PureComponent {
            componentWillMount() {
                const {store: {dispatch}} = this.context;
                if(actions) dispatch(injectActionHeader(actions));
                if(ExpandedHeaderComponent) dispatch(injectBarContentExpandedHeader(ExpandedHeaderComponent));
                if(SummaryHeaderComponent) dispatch(injectBarContentSummaryHeader(SummaryHeaderComponent));
                if(LeftHeaderComponent) dispatch(injectBarContentLeftHeader(LeftHeaderComponent));
                if(RightHeaderComponent) dispatch(injectBarContentRightHeader(RightHeaderComponent));
            }
            componentDidMount() {
                const {store: {dispatch}} = this.context;
                const position = isStaticHeader ? 0 : triggerScrollPosition;
                dispatch(triggerPosition(position));
            }
            componentWillUnmount(){
                const {store: {dispatch}} = this.context;
                if(actions) dispatch(injectActionHeader({}));
                if(SummaryHeaderComponent) dispatch(injectBarContentSummaryHeader(Empty));
                if(ExpandedHeaderComponent) dispatch(injectBarContentExpandedHeader(Empty));
                if(LeftHeaderComponent) dispatch(injectBarContentLeftHeader(Empty));
                if(RightHeaderComponent) dispatch(injectBarContentRightHeader(Empty));
            }
            componentWillReceiveProps(newProps) {
                if(isStaticHeader) return;
                const isDateUpdated = this.props.lastUpdate !== newProps.lastUpdate;
                const isTriggerPositionChanged = this.props.triggerPosition !== newProps.triggerPosition;
                const header = document.querySelector('header[data-focus="header"] [data-focus="header-bar-expanded"]');
                const shouldTriggerProsition = header !== null && (isDateUpdated || isTriggerPositionChanged);
                if(shouldTriggerProsition) {
                    const {store: {dispatch}} = this.context;
                    dispatch(triggerPosition(header.offsetHeight))
                }
            }
            render() {
                const {store: {dispatch}} = this.context;
                const headerActions = {
                    actions: (actions) => dispatch(injectActionHeader(actions)),
                    ExpandedHeaderComponent: (ExpandedHeaderComponent) => dispatch(injectBarContentExpandedHeader(ExpandedHeaderComponent)),
                    SummaryHeaderComponent: (SummaryHeaderComponent) => dispatch(injectBarContentSummaryHeader(SummaryHeaderComponent)),
                    LeftHeaderComponent: (LeftHeaderComponent) => dispatch(injectBarContentLeftHeader(LeftHeaderComponent)),
                    RightHeaderComponent: (RightHeaderComponent) => dispatch(injectBarContentRightHeader(RightHeaderComponent)),
                    triggerPosition: (triggerScrollPosition) => dispatch(triggerPosition(triggerScrollPosition))
                }
                return <ComponentToConnect {...this.props} headerActions={headerActions} />
            }
        }
        ConnectedToHeaderComponent.props = ComponentToConnect.props;
        ConnectedToHeaderComponent.contextTypes = {
            store: PropTypes.shape({
                subscribe: PropTypes.func.isRequired,
                dispatch: PropTypes.func.isRequired,
                getState: PropTypes.func.isRequired
            })
        };
        return compose (
            connectToState(s => s.header)
        )(ConnectedToHeaderComponent);
    }
}
