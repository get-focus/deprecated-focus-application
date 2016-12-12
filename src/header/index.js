import {connect} from 'react-redux';
import Header from './header-component';
import {headerSelector} from './header-reducer';
export default connect(headerSelector)(Header);
