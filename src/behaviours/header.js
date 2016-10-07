import React, {PropTypes, PureComponent} from 'react';
import {
    injectActionHeader,
    injectBarContentExpandedHeader,
    injectBarContentLeftHeader,
    injectBarContentRightHeader,
    injectBarContentSummaryHeader,
    triggerPosition
} from '../header/header-actions';


export const connect = ({actions, ExpandedHeaderComponent, SummaryHeaderComponent, LeftHeaderComponent, RightHeaderComponent, triggerPosition}) => {
    return (ComponentToConnect) => {
        class ConnectedToHeaderComponent extends PureComponent {
            componentWillMount() {
                const {store: {dispatch}} = this.context;
                if(actions) dispatch(injectActionHeader(actions));
                if(SummaryHeaderComponent) dispatch(injectBarContentSummaryHeader(SummaryHeaderComponent));
                if(ExpandedHeaderComponent) dispatch(injectBarContentExpandedHeader(ExpandedHeaderComponent));
                if(LeftHeaderComponent) dispatch(injectBarContentLeftHeader(LeftHeaderComponent));
                if(RightHeaderComponent) dispatch(injectBarContentRightHeader(RightHeaderComponent));
                if(triggerPosition) dispatch(triggerPosition(triggerPosition));
            }
            componentWillUnMount(){
                const {store: {dispatch}} = this.context;
                if(actions) dispatch(injectActionHeader(null));
                if(SummaryHeaderComponent) dispatch(injectBarContentSummaryHeader(null));
                if(ExpandedHeaderComponent) dispatch(injectBarContentExpandedHeader(null));
                if(LeftHeaderComponent) dispatch(injectBarContentLeftHeader(null));
                if(RightHeaderComponent) dispatch(injectBarContentRightHeader(null));
                if(triggerPosition) dispatch(triggerPosition(null));
            }
            render() {
                const {store: {dispatch}} = this.context;
                const headerActions = {
                    actions: () => dispatch(injectActionHeader(actions)),
                    ExpandedHeaderComponent: () => dispatch(injectBarContentExpandedHeader(ExpandedHeaderComponent)),
                    SummaryHeaderComponent: () => dispatch(injectBarContentSummaryHeader(SummaryHeaderComponent)),
                    LeftHeaderComponent: () => dispatch(injectBarContentLeftHeader(LeftHeaderComponent)),
                    RightHeaderComponent: () => dispatch(injectBarContentRightHeader(RightHeaderComponent)),
                    triggerPosition: () => dispatch(triggerPosition(triggerPosition))
                }
                return <ComponentToConnect {...this.props} {...headerActions} />
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
        return ConnectedToHeaderComponent;
    }
}
