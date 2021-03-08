import jwt from 'jsonwebtoken';

const JWTSignature = process.env.JWT_SIGNATURE;

export async function createToken(sessionToken, userId) {
  try {
    // create a refresh token
      // contains session token
      const refreshToken = jwt.sign({
        sessionToken: sessionToken
      }, JWTSignature)
      // create access token
      // contains sessionId and userId
      const accessToken = jwt.sign({
        sessionToken: sessionToken,
        userId
      }, JWTSignature);
      return {refreshToken, accessToken};
  } catch(error) {
    console.error(error);
  }
}

export function setCookies(res, accessToken, refreshToken) {
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