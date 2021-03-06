import bcryptjs from 'bcryptjs';

const {compare} = bcryptjs;

export async function authorizeUser(email, password) {
  const {user} = await import('../user/user.js');
  const userData = await user.findOne({'email.address': email});
  if(!userData) return {isAuthorized, userId: null};
  const isAuthorized = await compare(password, userData.password);
  return {isAuthorized, userId: userData._id};
}