import React, {Component, PropTypes} from 'react';

const fixedStyle = {position: 'fixed', width: '100%', top: '0px', zIndex: 1000};

const Dropdown = props => <div>{JSON.stringify(props, null, 4)}</div>

function ContentActions({primary, secondary}){
    return (
        <div data-focus='content-actions'>
            {primary.map((primary) => {
                if(Array.isArray(primary.action)) {
                    return <Dropdown iconProps={{name: primary.icon}} operationList={primary.action} shape='fab'/>;
                } else {
                    return (
                        <Button handleOnClick={primary.action} icon={primary.icon} label={primary.label} shape='fab' style={{className: primary.className}} type='button'/>
                    );
                }
            })}
            <Dropdown iconProps={{name: 'more_vert'}} operationList={secondary} shape='fab'/>
        </div>
    );
}


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

const fakeComponentCreator = name => function(props){return <span>{name} - {JSON.stringify(props)}</span>}

    HeaderComponent.defaultProps = {
        isExpanded: true,
        BarContentLeft: fakeComponentCreator('BarContentLeft'),
        BarContentSummary: fakeComponentCreator('BarContentSummary'),
        BarContentRight: fakeComponentCreator('BarContentRight'),
        BarContentExpanded: fakeComponentCreator('BarContentExpanded'),
        actions: {primary: [], secondary: []},
        ContentActionsComponent: ContentActions
    }

    HeaderComponent.propTypes = {
        isExpanded: PropTypes.bool,
        BarContentLeft: PropTypes.func,
        BarContentSummary: PropTypes.func,
        BarContentRight: PropTypes.func,
        BarContentExpanded: PropTypes.func
    }

    export default HeaderComponent
