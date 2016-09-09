import {connect} from 'react-redux';
import {confirmSelector} from './confirm-reducer';
import ConfirmWrapper from './confirm-wrapper'

export default connect(confirmSelector)(ConfirmWrapper);
