
import React, {PropTypes, PureComponent} from 'react'


import {initializeSession, addGlobalRole,addLocalRole, setLocalPermissions , setGlobalPermissions} from './session-actions'

const SESSION_CONNECT = 'MASTER_DATA_CONNECT';
const SESSION_PROPTYPE = {
  service: PropTypes.func.isRequired
}

const SESSION_CONTEXT_TYPE = {
    sessionLoaders: SESSION_PROPTYPE,
};

class SessionProvider extends PureComponent {

    componentWillMount() {
        const {store: {dispatch}} = this.context;
        const {service} = this.props
        const asyncServiceSessionLoad = async (dispatch) => {
          try {
              const value = await service();
              dispatch(initializeSession(value));
              dispatch(setLocalPermissions(['value']));
              dispatch(addGlobalRole('lol'));
          }catch(error) {
            throw new Error(`FOCUS_APPLICATION_SESSION, you need provide a service to the SessionProvider`, error);
          }

        }
        asyncServiceSessionLoad(dispatch);
    }
    getChildContext() {
        return {
            sessionLoaders: this.props.service
        }
    }
    render() {
        return this.props.children;
    }
}

SessionProvider.childContextTypes = SESSION_CONTEXT_TYPE;

SessionProvider.contextTypes = {
  store: PropTypes.shape({
     subscribe: PropTypes.func.isRequired,
     dispatch: PropTypes.func.isRequired,
     getState: PropTypes.func.isRequired
 }),
}
SessionProvider.propTypes = SESSION_PROPTYPE;

export const Provider = SessionProvider;
