import React from 'react';
import { mount, render } from 'enzyme';
import { compose } from 'redux'
import {connect as connectToHeader} from '../header';

import headerReducer from '../../header/header-reducer';
import {Provider as StoreProvider} from 'react-redux';
import builder from '../../store/create-store';
const store = builder({dataset:headerReducer}, [], [DevTools.instrument()]);

const LeftComponent = () => <div>left</div>
const RightComponent = () => <div>right</div>
const SummaryComponent = () => <div>summary</div>
const ExpandedComponent = () => <div>expanded</div>
const actions = {primary: [{action: () => console.log('Primaire'), label: 'Primaire', icon: 'home'}], secondary: [{action: () => console.log('secondary'), label: 'Secondaire', icon: 'home'}]};

// connectToHeader({
//     actions: {primary: [{action: () => console.log('Primaire'), label: 'Primaire', icon: 'home'}], secondary: [{action: () => console.log('secondary'), label: 'Secondaire', icon: 'home'}]},
//     ExpandedHeaderComponent: ExpandedUserHeader,
//     SummaryHeaderComponent: SummaryUserHeader,
//     LeftHeaderComponent: () => (<div>Left</div>),
//     RightHeaderComponent: () => (<div>Right</div>),
//     //triggerScrollPosition: 0
// })
describe('ConnectedToHeaderComponent(...)', () => {
    describe('when mounted', () => {
        describe.only('with no props', () => {
            let capturedProps;
            const ComponentToConnect = (props) => {
                capturedProps = props;
                return (
                    <div>component</div>
                );
            }
            const WrappedComponentToConnected = () => {
                <StoreProvider store={store}>
                    <ComponentToConnect/>
                </StoreProvider>
            }
            const headerProps = {};
            const ConnectedComponent = compose(connectToHeader(headerProps))(ComponentToConnect);
            const wrapper = mount(<WrappedComponentToConnected />);
            console.log(wrapper);
            it('should display the header without components', () => {
                const header = wrapper.find('header[data-focus="header"]');
                expect(rootNode).to.exist;
                const headerNotExpanded = wrapper.find('header[data-focus="header"][data-is-expanded="false"]');
                expect(rootNode).to.exist;
            });
        });
        describe('with actions', () => {
            const headerProps = {
                actions: actions
            };
            const ConnectedComponent = compose(connectToHeader(headerProps))(ComponentToConnect);
            const wrapper = mount(ConnectedComponent());
            it('the header should exist', () => {

            });
        });
    });
});
