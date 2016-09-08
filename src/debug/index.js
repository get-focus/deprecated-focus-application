import React from 'react';
import {connect} from 'react-redux';
const reduxSelector = s => ({redux: s})
export default connect(reduxSelector)(props => <pre><code>{JSON.stringify(props.redux, null, 4)}</code></pre>)
