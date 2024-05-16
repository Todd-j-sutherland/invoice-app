import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function clientPromise() {
  if (!client.isConnected()) await client.connect();
  return client;
}

export default clientPromise;
