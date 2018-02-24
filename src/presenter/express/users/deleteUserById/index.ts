import Config from '../../Config';
import catchErrors from '../../utils/catchErrors';
import {OK_200_HTTP_CODE} from '../../utils/constants';
import getAuthUser from '../../../../utils/jwt/getAuthUser';
import hasPermission from '../../../../utils/jwt/hasPermission';
import {CAN_DELETE_USER} from '../../../../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req, res) => {
  
    const user = await getAuthUser({req, service: config.service});

    hasPermission({user, permissionName: CAN_DELETE_USER});

    const {user_id} = req.params;

    await config.service.deleteUserById({id: user_id});

    res.status(OK_200_HTTP_CODE).json({success: true});
  });
};