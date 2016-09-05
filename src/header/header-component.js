import React, {PropTypes} from 'react';

function HeaderComponent({
  isExpanded,
  BarContentLeft,
  BarContentSummary,
  BarContentRight,
  BarContentExpanded
}){
    return (<div>
        <nav style={{display: 'flex', justifyContent: 'space-around'}}>
          <BarContentLeft />
          {!isExpanded && <BarContentSummary />}
          <BarContentRight/>
        </nav>
        {isExpanded && <BarContentExpanded/>}
    </div>)
}
const fakeStyle = {backgroundColor: 'blue', color: 'white'};
const fakeComponentCreator = name => function(props){return <pre style={fakeStyle}><h2>{name}</h2><code>{JSON.stringify(props, null, 4)}</code></pre>}
HeaderComponent.defaultProps = {
  isExpanded: false,
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
