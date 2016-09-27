
import React, {PropTypes, PureComponent} from 'react'


import {asyncActionsInitialize, initializeProfil, addRole, setRole} from './profil-actions'

const PROFILE_CONNECT = 'MASTER_DATA_CONNECT';
const PROFILE_PROPTYPE = {
  name: PropTypes.string.isRequired,
  service: PropTypes.func.isRequired
}

const PROFILE_CONTEXT_TYPE = {
    profileLoaders: PROFILE_PROPTYPE,
};






class ProfileProvider extends PureComponent {

    componentWillMount() {
        const {store: {dispatch}} = this.context;
        const {service} = this.props
        const asyncServiceUserLoad = async (dispatch) => {
          try {
              const value = await service();
              dispatch(initializeProfil(value));
              dispatch(setRole(['retest']));

          }catch(error) {
            throw new Error(`FOCUS_APPLICATION_PROFILE, you need provide a service to the ProfileProvider`, error);
          }

        }
        asyncServiceUserLoad(dispatch);
        //asyncActionsInitialize(this.props.service)();
    }
    getChildContext() {
        return {

            profileLoaders: this.props.service
        }
    }
    render() {
        return this.props.children;
    }
}

ProfileProvider.childContextTypes = PROFILE_CONTEXT_TYPE;

ProfileProvider.contextTypes = {
  store: PropTypes.shape({
     subscribe: PropTypes.func.isRequired,
     dispatch: PropTypes.func.isRequired,
     getState: PropTypes.func.isRequired
 }),
}
ProfileProvider.propTypes = PROFILE_PROPTYPE;

export const Provider = ProfileProvider;
