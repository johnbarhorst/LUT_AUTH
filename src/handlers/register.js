import {registerUser} from '../accounts/register.js';


export async function register(req, res) {
  const {email, password} = req.body;
  try {
    const userId = await registerUser(email, password);
    res.send({userId});
  }catch(error) {
    console.error(error);
  }
}