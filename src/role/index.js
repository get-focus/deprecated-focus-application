import  {PureComponent, PropTypes} from 'react';
import isArray from 'lodash/isArray'
import intersection from 'lodash/intersection'
import {connect} from 'react-redux';
import compose from 'lodash/flowRight';

export const PERMISSION_CONTEXT_TYPE = {
  hasAtLeastOneLocalPermission: PropTypes.func,
  hasAllLocalPermissions: PropTypes.func,
  hasAtLeastOneGlobalPermission: PropTypes.func,
  hasAllGlobalPermissions: PropTypes.func
}
export function Permission(
  {hasAll,hasOne,children, emptyBlock},
  {hasAtLeastOneLocalPermission, hasAllLocalPermissions, hasAtLeastOneGlobalPermission, hasAllGlobalPermissions}
) {
    if(isArray(hasAll) && hasAllGlobalPermissions(hasAll)) {
        return children;
    } else if(isArray(hasOne) && hasAtLeastOneGlobalPermission(hasOne)) {
        return children;
    }
    return emptyBlock;
}


Permission.contextTypes = PERMISSION_CONTEXT_TYPE;
Permission.displayName = 'Permission';
Permission.defaultProps = {
    emptyBlock: null
};
Permission.propTypes = {
    children : PropTypes.object,
    hasOne: PropTypes.array,
    hasAll:PropTypes.array
};



// internal functions to check permissions.
const hasAtLeastOnePermission = (neededPermissions = [], userPermissions = []) => isArray(neededPermissions) && intersection(neededPermissions, userPermissions).length > 0;

const hasAllPermissions = (neededPermissions = [], userPermissions = []) => isArray(neededPermissions) && intersection(neededPermissions, userPermissions).length === neededPermissions.length;

// Permission Provider
// The permissions props should be loaded from the user informations on app start.
// Example <PermissionProvider permissions={['MY_PERMISSION1', 'MYPERMISSION2']}>...</PermissionProvider>
// After that you can use the Permission component.
class PermissionProvider extends PureComponent {
  getChildContext() {
      const {user, globalPermissions} = this.props;
      if(user && !globalPermissions){
        throw new Error(`FOCUS_APPLICATION_PERMISSION, you need provide a array of permissions to the user in the responce of the ProfileProvier`);

      }
      // if(!user || (user && user.permissions.length < 1)){
      //   throw new Error(`FOCUS_APPLICATION_PERMISSION, you need provide a  ProfileProvier`, error);
      // }
      return {
          hasAtLeastOneLocalPermission: neededLocalPermissions => hasAtLeastOnePermission(neededLocalPermissions, this.props.permissions || globalPermissions),
          hasAllLocalPermissions: neededLocalPermissions => hasAllPermissions(neededLocalPermissions, this.props.permissions || globalPermissions),
          hasAtLeastOneGlobalPermission: neededGlobalPermissions => hasAtLeastOnePermission(neededGlobalPermissions, this.props.permissions || globalPermissions),
          hasAllGlobalPermissions: neededGlobalPermissions => hasAllPermissions(neededGlobalPermissions, this.props.permissions || globalPermissions)
      };
  }
  render() {
      return this.props.children;
  }
}
const ConnectedPermissionProvider = compose(
  connect(s=>s.session)
)(
  PermissionProvider
);

PermissionProvider.childContextTypes = PERMISSION_CONTEXT_TYPE;

PermissionProvider.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.string)
};

export const Provider = ConnectedPermissionProvider;
