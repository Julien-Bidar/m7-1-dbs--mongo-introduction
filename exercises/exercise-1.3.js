const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");

  const data = await db.collection("users").find().toArray();

  if (data.length > 0) {
    res.status(200).json({ status: 200, data: data });
  } else {
    res.status(404).json({ status: 404, message: "no data returned" });
  }

  client.close();
};

module.exports = { getUsers };
