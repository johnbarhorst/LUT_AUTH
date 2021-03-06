import {createSession} from './session.js';
import {createToken} from './tokens.js';


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
  const now = new Date();
  const refreshExpires = now.setDate(now.getDate() + 30);
  res
  .setCookie('refreshToken', refreshToken, {
    path: '/',
    domain: 'localhost',
    httpOnly: true,
    expires: refreshExpires
  })
  .setCookie('accessToken', accessToken, {
    path: '/',
    domain: 'localhost',
    httpOnly: true,
  })
}