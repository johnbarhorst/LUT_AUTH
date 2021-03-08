import jwt from 'jsonwebtoken';
const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

export async function logout(req, res) {
  try {
    const {refreshToken} = req?.cookies;
    if(refreshToken) {
      const {session} = await import('../session/session.js');
      const {sessionToken} = jwt.verify(refreshToken, JWT_SIGNATURE);
      await session.deleteOne({sessionToken});
    }
    res.clearCookie('refreshToken').clearCookie('accessToken').send({success: true});
  } catch (error) {
    console.error(error);  
  }
}