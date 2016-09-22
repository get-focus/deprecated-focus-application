import React, {Component, PropTypes} from 'react';

const FakeCustomActions = () => <div>You can 'focus-components/header-actions' component or define your own component</div>

function HeaderComponent({
    isExpanded,
    BarContentLeft,
    BarContentSummary,
    BarContentRight,
    BarContentExpanded,
    ContentActionsComponent,
    triggerPosition,
    actions
}) {
    return (
        <header data-focus='header' data-is-expanded={isExpanded}>
            <nav>
                <div data-focus='header-bar'>
                    <div data-focus='header-bar-left'><BarContentLeft /></div>
                    {!isExpanded && <div data-focus='header-bar-summary'><BarContentSummary /></div>}
                    <div data-focus='header-bar-right'><BarContentRight/></div>
                </div>
                {actions && <div data-focus='header-bar-actions'><ContentActionsComponent primary={actions.primary} secondary={actions.secondary} /></div>}
            </nav>
            <div data-focus='header-bar-expanded'><BarContentExpanded/></div>
        </header>
    );
}

const fakeComponentCreator = name => props => <span>{name} - {JSON.stringify(props)}</span>

HeaderComponent.defaultProps = {
    isExpanded: true,
    BarContentLeft: fakeComponentCreator('BarContentLeft'),
    BarContentSummary: fakeComponentCreator('BarContentSummary'),
    BarContentRight: fakeComponentCreator('BarContentRight'),
    BarContentExpanded: fakeComponentCreator('BarContentExpanded'),
    ContentActionsComponent: FakeCustomActions
};

HeaderComponent.propTypes = {
    isExpanded: PropTypes.bool,
    BarContentLeft: PropTypes.func,
    BarContentSummary: PropTypes.func,
    BarContentRight: PropTypes.func,
    BarContentExpanded: PropTypes.func,
    ContentActionsComponent: PropTypes.func
};

export default HeaderComponent;
