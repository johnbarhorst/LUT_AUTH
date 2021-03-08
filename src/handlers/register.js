import { logUserIn } from '../accounts/logUserIn.js';
import {registerUser} from '../accounts/register.js';


export async function register(req, res) {
  const {email, password} = req.body;
  try {
    const userId = await registerUser(email, password);
    await logUserIn(userId, req, res);
    res.send({success: true, userId});
  }catch(error) {
    console.error(error);
    res.send({success: false, error});
  }
}