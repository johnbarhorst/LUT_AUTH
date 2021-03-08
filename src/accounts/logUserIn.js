import {createSession} from './session.js';
import {createToken, setCookies} from './tokens.js';
import { refreshTokens } from './user.js';


export async function logUserIn(userId, req, res) {
  //create the session
  const connectionInformation = {
    // .ip is fastify specific. might be under something else in express or whatever
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  }
  const sessionToken = await createSession(userId, connectionInformation);
  //create the JWT
  const {accessToken, refreshToken} = await createToken(sessionToken, userId);

  //set the cookie
  setCookies(res, accessToken, refreshToken);
}