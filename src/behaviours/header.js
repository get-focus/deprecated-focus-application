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


export const connect = ({actions = null, ExpandedHeaderComponent = null, SummaryHeaderComponent = null, LeftHeaderComponent = null, RightHeaderComponent = null, triggerScrollPosition = 60}) => {
    return (ComponentToConnect) => {
        class ConnectedToHeaderComponent extends PureComponent {
            componentWillMount() {
                const {store: {dispatch}} = this.context;
                if(actions) dispatch(injectActionHeader(actions));
                if(SummaryHeaderComponent) dispatch(injectBarContentSummaryHeader(SummaryHeaderComponent));
                if(ExpandedHeaderComponent) dispatch(injectBarContentExpandedHeader(ExpandedHeaderComponent));
                if(LeftHeaderComponent) dispatch(injectBarContentLeftHeader(LeftHeaderComponent));
                if(RightHeaderComponent) dispatch(injectBarContentRightHeader(RightHeaderComponent));
                if(triggerScrollPosition) dispatch(triggerPosition(triggerScrollPosition));
            }
            componentWillUnMount(){
                const {store: {dispatch}} = this.context;
                if(actions) dispatch(injectActionHeader(null));
                if(SummaryHeaderComponent) dispatch(injectBarContentSummaryHeader(null));
                if(ExpandedHeaderComponent) dispatch(injectBarContentExpandedHeader(null));
                if(LeftHeaderComponent) dispatch(injectBarContentLeftHeader(null));
                if(RightHeaderComponent) dispatch(injectBarContentRightHeader(null));
                if(triggerScrollPosition) dispatch(triggerPosition(null));
            }
            componentWillReceiveProps(newProps) {
                const {store: {dispatch}} = this.context;
                if(this.props.lastUpdate!== newProps.lastUpdate) {
                    const header = document.querySelector('header[data-focus="header"] [data-focus="header-bar-expanded"]');
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
                    triggerPosition: (triggerPosition) => dispatch(triggerPosition(triggerPosition))
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
            connectToState(s=> s.header)
        )(ConnectedToHeaderComponent);
    }
}
