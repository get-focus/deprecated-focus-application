import {connect} from 'react-redux';
import {totalsFetchSelector} from './fetch-reducer';
import LoadingBarComponent from './fetch-component';
export default connect(totalsFetchSelector)(LoadingBarComponent);
