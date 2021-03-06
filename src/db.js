import mongo from 'mongodb';

const {MongoClient} = mongo;

const url = process.env.MONGO_URL;

export const client = new MongoClient(url, {useNewUrlParser: true});

export async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ping: 1});
    console.log("⚡️ Connected To DB ⚡️");
  } catch(error) {
    console.error(error);
    // Closes connection when errors happen
    await client.close();
  }
}