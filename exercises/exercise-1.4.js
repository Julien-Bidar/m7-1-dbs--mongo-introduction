const MongClient = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const addUser = async (req, res) => {
  const client = await MongClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");

  const body = req.body;
  console.log(body);

  if (body) {
    await db.collection("users").insertOne({ name: body.name });
    res.status(201).json({ status: 201, message: "user created" });
  } else {
    res.status(400).json({ status: 400, message: "something went wrong" });
  }
  client.close();
};

module.exports = { addUser };
