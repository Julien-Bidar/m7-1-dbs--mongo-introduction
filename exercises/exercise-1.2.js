const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewParser: true,
  useUnifiedTopology: true,
};

const getCollection = async () => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");

  const data = await db.collection("users").find().toArray();
  console.log(data);
};

getCollection();
