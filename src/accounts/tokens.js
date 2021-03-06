import jwt from 'jsonwebtoken';

const JWTSignature = process.env.JWT_SIGNATURE;

export async function createToken(sessionToken, userId) {
  try {
    // create a refresh token
      // contains session Id
      const refreshToken = jwt.sign({
        sessionId: sessionToken
      }, JWTSignature)
      // create access token
      // contains sessionId and userId
      const accessToken = jwt.sign({
        sessionId: sessionToken,
        userId
      }, JWTSignature);
      return {refreshToken, accessToken};
  } catch(error) {
    console.error(error);
  }
}