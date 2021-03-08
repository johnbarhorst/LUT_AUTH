import { getUserFromCookies } from "../accounts/user.js";

export async function refresh(req, res) {
  // verify user login
  const user = await getUserFromCookies(req, res);
  // otherwise return unauthorized
  console.log("user",user);
  if(user?._id) {
    return res.send({user});
  } else {
    res.send({success: false, error: "Look up error"})
  }
}