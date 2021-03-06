import jwt from 'jsonwebtoken';
const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

export async function getUserFromCookies(req) {
  try {
    // check for access token
    if(req?.cookies?.accessToken) {
      const {user} = await import('../user/user.js');
      const {accessToken} = req.cookies;
      // decode the access token
      const decodedAccessToken = jwt.verify(accessToken, JWT_SIGNATURE);
      // return user from db
      return user.findOne({
        _id: decodedAccessToken.userId
      });

    }
    // get the access and refresh tokens
    // decode the jwts
    // check to see if access token
    // if no accessToken, decode the refreshToken
    // look up session
    // if session value, refresh token
    return false;
  } catch (error) {
  console.error(error);
  }
}

export async function refreshTokens() {
  try {
  
  } catch (error) {
    console.error(error);
    }
}