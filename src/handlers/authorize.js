import {authorizeUser} from '../accounts/authorize.js';
import {logUserIn} from '../accounts/logUserIn.js';



export async function authorize(req, res) {
  const {email, password} = req.body;
  try {
    const {isAuthorized, userId} = await authorizeUser(email, password);
    if(isAuthorized) {
      await logUserIn(userId, req, res);
      res.send({success: isAuthorized});
    }
    res.send({success: false});
  } catch (error) {
    console.error(error);
  }
}