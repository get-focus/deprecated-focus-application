import React, {PropTypes} from 'react';

const fixedStyle = {position: 'fixed', width: '100%', top: '0px'};

function HeaderComponent({
  isExpanded,
  BarContentLeft,
  BarContentSummary,
  BarContentRight,
  BarContentExpanded,
  triggerPosition
}){
    return (<div style={isExpanded ? undefined : fixedStyle}>
        <nav style={{display: 'flex', justifyContent: 'space-around'}}>
          <BarContentLeft />
          {!isExpanded && <BarContentSummary />}
          <BarContentRight/>
        </nav>
        {isExpanded ?  <BarContentExpanded/> :  <div style={{width: '100%', height: `${triggerPosition}px`}}></div>}
    </div>)
}
const fakeStyle = {backgroundColor: 'blue', color: 'white'};
const fakeComponentCreator = name => function(props){return <pre style={fakeStyle}><h2>{name}</h2><code>{JSON.stringify(props, null, 4)}</code></pre>}
HeaderComponent.defaultProps = {
  isExpanded: true,
  BarContentLeft: fakeComponentCreator('BarContentLeft'),
  BarContentSummary: fakeComponentCreator('BarContentSummary'),
  BarContentRight: fakeComponentCreator('BarContentRight'),
  BarContentExpanded: fakeComponentCreator('BarContentExpanded')
}

HeaderComponent.propTypes = {
  isExpanded: PropTypes.bool,
  BarContentLeft: PropTypes.func,
  BarContentSummary: PropTypes.func,
  BarContentRight: PropTypes.func,
  BarContentExpanded: PropTypes.func
}

export default HeaderComponent
