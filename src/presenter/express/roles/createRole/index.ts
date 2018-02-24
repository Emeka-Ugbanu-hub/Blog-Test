import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import { CREATED_201_HTTP_CODE } from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import { CAN_CREATE_ROLE, VARCHAR_FIELD_LENGTH, TEXT_FIELD_LENGTH } from '../../../../utils/constants';
import { maxLength } from '../../../../utils/validate';
import { maybe, required, optional, composeRules, restrictToSchema } from 'rulr';

const validateCreateRole = maybe(composeRules([
  restrictToSchema({
    name: required(maxLength(VARCHAR_FIELD_LENGTH)),
    description: optional(maxLength(TEXT_FIELD_LENGTH)),
  })
]));

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_CREATE_ROLE});
 
    validateCreateRole(req.body, ['role']);
    
    const createRole = await config.service.createRole(req.body);

    res.status(CREATED_201_HTTP_CODE).json(createRole);
  });
};