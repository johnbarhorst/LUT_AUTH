// ESM requires the file extension. You've been living a compiler lie!
import './env.js';
import {fastify} from 'fastify';
import fastifyStatic from 'fastify-static';
import fastifyCookie from 'fastify-cookie';
import path from 'path';
import {fileURLToPath} from 'url';
import {connectDB} from './db.js';
import {register} from './handlers/register.js'
import {authorize} from './handlers/authorize.js'
import { getUserFromCookies } from './accounts/user.js';



// ESM Specific boilerplate.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();
console.log(process.env.MONGO_URL);
async function startApp() {
  try {
    app.register(fastifyCookie, {
      secret: process.env.COOKIE_SIGNATURE
    })
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });
    app.post("/api/register", {}, register);
    app.post("/api/authorize", {}, authorize);
    app.get("/test", {}, async (req, res) => {
      // verify user login
      const user = await getUserFromCookies(req, res);
      // otherwise return unauthorized
      console.log("user",user);
      if(user?._id) {
        return res.send({user});
      } else {
        res.send({success: false, error: "Look up error"})
      }
    })
    await app.listen(3000);
    console.log("🎧 Listening on port 3000");
  } catch(error) {
    console.error(error);
  }
};

connectDB().then(() => startApp()).catch(error => console.error(error));