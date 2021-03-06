import { randomBytes } from 'crypto';

export async function createSession(userId, connection) {
  // generate a session token
  const sessionToken = randomBytes(42).toString('hex');
  // retrieve connection information
  const {ip, userAgent} = connection;
  // save info to the db
  try {
    const {session} = await import('../session/session.js');
    await session.insertOne({
      sessionToken,
      userId,
      valid: true,
      userAgent,
      ip,
      updatedAt: new Date(),
      createdAt: new Date(),
    })
  } catch(error) {
    console.error(error);
    throw new Error("Session Creation Failed");
  }
  // return session token
  return sessionToken;
}