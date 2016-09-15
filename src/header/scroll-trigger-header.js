import React from 'react';
import {connect} from 'react-redux';
// Scroll Trigger component
import ScrollTrigger from '../layout/scroll-trigger';

// Get selector and actions from the header informations.
import { headerIsExpandedSelector} from './header-reducer';
import { expandHeader, unExpandHeader} from './header-actions'

// Wrapp all of them together to have a
export default connect(headerIsExpandedSelector,{expandHeader, unExpandHeader})(ScrollTrigger);
