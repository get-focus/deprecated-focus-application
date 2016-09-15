import React, {PropTypes} from 'react';

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
}){
    return (<header data-focus='header-bar' data-is-expanded={isExpanded}>
        <nav data-focus='bar'>
          <BarContentLeft />
          {!isExpanded && <BarContentSummary />}
          <BarContentRight/>
        </nav>
        {isExpanded ?  <BarContentExpanded/> :  <div style={{width: '100%', height: `${triggerPosition}px`}}></div>}
        {/* Actions primary and secondary*/}
        {actions && <ContentActionsComponent primary={actions.primary} secondary={actions.secondary} />}
    </header>)
}
const fakeStyle = {backgroundColor: 'blue', color: 'white'};
const fakeComponentCreator = name => function(props){return <pre style={fakeStyle}><h2>{name}</h2><code>{JSON.stringify(props, null, 4)}</code></pre>}
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
