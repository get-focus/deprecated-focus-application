import  {PureComponent, PropTypes} from 'react';
import isArray from 'lodash/isArray'
import intersection from 'lodash/intersection'
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
      return {
          hasAtLeastOneRole: neededRoles => hasAtLeastOneRole(neededRoles, this.props.roles),
          hasAllRoles: neededRoles => hasAllRoles(neededRoles, this.props.roles)
      };
  }
  render() {
      return this.props.children;
  }
}

RoleProvider.childContextTypes = ROLE_CONTEXT_TYPE;

RoleProvider.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string)
};

export const Provider = RoleProvider;
