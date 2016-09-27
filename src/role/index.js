import  {PureComponent, PropTypes} from 'react';
import isArray from 'lodash/isArray'
import intersection from 'lodash/intersection'
import {connect} from 'react-redux';
import compose from 'lodash/flowRight';

export const ROLE_CONTEXT_TYPE = {
  hasAtLeastOneRole: PropTypes.func,
  hasAllRoles: PropTypes.func
}
export function Role(
  {hasAll,hasOne,children, emptyBlock},
  {hasAtLeastOneRole, hasAllRoles}
) {
    if(isArray(hasAll) && hasAllRoles(hasAll)) {
        return children;
    } else if(isArray(hasOne) && hasAtLeastOneRole(hasOne)) {
        return children;
    }
    return emptyBlock;
}


Role.contextTypes = ROLE_CONTEXT_TYPE;
Role.displayName = 'Role';
Role.defaultProps = {
    emptyBlock: null
};
Role.propTypes = {
    children : PropTypes.object,
    hasOne: PropTypes.array,
    hasAll:PropTypes.array
};



// internal functions to check roles.
const hasAtLeastOneRole = (neededRoles = [], userRoles = []) => isArray(neededRoles) && intersection(neededRoles, userRoles).length > 0;

const hasAllRoles = (neededRoles = [], userRoles = []) => isArray(neededRoles) && intersection(neededRoles, userRoles).length === neededRoles.length;

// Role Provider
// The roles props should be loaded from the user informations on app start.
// Example <RoleProvider roles={['MY_ROLE1', 'MYROLE2']}>...</RoleProvider>
// After that you can use the Role component.
class RoleProvider extends PureComponent {
  getChildContext() {
      const {user} = this.props;
      if(user && !user.roles){
        throw new Error(`FOCUS_APPLICATION_ROLE, you need provide a  profil to the user in the responce of the ProfileProvier`);

      }
      // if(!user || (user && user.roles.length < 1)){
      //   throw new Error(`FOCUS_APPLICATION_ROLE, you need provide a  ProfileProvier`, error);
      // }
      const {roles} = this.props.user;
      console.log()
      return {
          hasAtLeastOneRole: neededRoles => hasAtLeastOneRole(neededRoles, this.props.roles || roles),
          hasAllRoles: neededRoles => hasAllRoles(neededRoles, this.props.roles || roles)
      };
  }
  render() {
      console.log(this.props)
      return this.props.children;
  }
}
const ConnectedRoleProvider = compose(
  connect(s=>s.profile)
)(
  RoleProvider
);

RoleProvider.childContextTypes = ROLE_CONTEXT_TYPE;

RoleProvider.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string)
};

export const Provider = ConnectedRoleProvider;
