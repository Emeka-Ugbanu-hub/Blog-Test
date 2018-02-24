import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { OK_200_HTTP_CODE } from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_ASSIGN_PERMISSION } from '../../../../utils/constants';
import { maybe, required, checkType, composeRules, restrictToSchema } from 'rulr';

const validateAssignRolePermission = maybe( composeRules([
  restrictToSchema({
    permission_id: required(checkType(String))
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_ASSIGN_PERMISSION});
 
    validateAssignRolePermission(req.body, ['role']);

    const {role_id} = req.params;
    const {permission_id} = req.body;

    await config.service.assignRolePermission({
      role_id, permission_id
    });

    res.status(OK_200_HTTP_CODE).json({success: true});
  });
};