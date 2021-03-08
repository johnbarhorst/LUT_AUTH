import mongo from 'mongodb';
import jwt from 'jsonwebtoken';
import { createToken, setCookies } from './tokens.js';
const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

const {ObjectID} = mongo;

export async function getUserFromCookies(req, res) {
  const accessToken = req?.cookies?.accessToken;
  const refreshToken = req?.cookies?.refreshToken;

  try {
    const {user} = await import('../user/user.js');
    // check for access token
    if(accessToken) {
      // decode the access token
      console.log('access token');
      const decodedAccessToken = jwt.verify(accessToken, JWT_SIGNATURE);
      // return user from db
      return user.findOne({
        _id: ObjectID(decodedAccessToken?.userId)
      });

    }
    if(refreshToken) {
      const {session} = await import('../session/session.js');
      const {sessionToken} = jwt.verify(refreshToken, JWT_SIGNATURE);
      console.log("session token",sessionToken);
      const userSession = await session.findOne({sessionToken});
      if(userSession?.valid) {
        const currentUser = await user.findOne({
          _id: ObjectID(userSession.userId),
        });
        await refreshTokens(sessionToken, currentUser._id, res);
        return currentUser;
      }
      
    }
    // decode the jwts
    // if no accessToken, decode the refreshToken
    // look up session
    // if session value, refresh token
    return false;
  } catch (error) {
  console.error(error);
  }
}

export async function refreshTokens(sessionToken, userId, res) {
  try {
  // create tokens
  const {accessToken, refreshToken} = await createToken(sessionToken, userId);
  setCookies(res, accessToken, refreshToken);

  } catch (error) {
    console.error(error);
    }
}