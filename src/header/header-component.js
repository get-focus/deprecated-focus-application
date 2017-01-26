import React, {PropTypes, PureComponent} from 'react';

class HeaderComponent extends PureComponent {
    render() {
        const {
            isExpanded,
            BarContentLeft,
            BarContentSummary,
            BarContentRight,
            BarContentExpanded,
            ContentActionsComponent,
            triggerPosition,
            actions
        } = this.props;
        const isFixed = triggerPosition !== undefined && triggerPosition === 0;
        const isNotFixedOrExpanded = isFixed ? false : isExpanded;
        return (
            <header data-focus='header' data-is-expanded={isNotFixedOrExpanded}>
                <nav>
                    <div data-focus='header-bar'>
                        <div data-focus='header-bar-left'><BarContentLeft /></div>
                        {!isNotFixedOrExpanded && <div data-focus='header-bar-summary'><BarContentSummary /></div>}
                        <div data-focus='header-bar-right'><BarContentRight/></div>
                    </div>
                    {actions && <div data-focus='header-bar-actions'><ContentActionsComponent primary={actions.primary} secondary={actions.secondary} /></div>}
                </nav>
                {!isFixed && BarContentExpanded && <div data-focus='header-bar-expanded'><BarContentExpanded /></div>}
            </header>
        );
    }
}

HeaderComponent.defaultProps = {
    isExpanded: true,
    BarContentLeft: () => null,
    BarContentSummary: () => null,
    BarContentRight: () => null,
    BarContentExpanded: null,
    ContentActionsComponent: () => null
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
