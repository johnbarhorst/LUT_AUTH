import bcryptjs from 'bcryptjs';
const {genSalt, hash} = bcryptjs;


export async function registerUser(email, password) {
  const {user} = await import("../user/user.js");
  // generate salt
  const salt = await genSalt(10);

  // hash
  const hashedPassword = await hash(password, salt);
  
  // store in database
  const result = await user.insertOne({
    email: {
      address: email,
      verified: false,
    },
    password: hashedPassword,
  })
  // return user from database
  return result.insertedId;
}