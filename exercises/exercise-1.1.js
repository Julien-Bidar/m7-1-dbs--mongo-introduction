const MongClient = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const dbfunction = async (dbName) => {
  //create new client
  const client = await MongClient(MONGO_URI, options);
  //connect to client
  await client.connect();
  //connect to db
  const db = client.db(dbName);
  console.log("connected!");
  await db.collection("users").insertOne({ name: "Buck Rogers" });

  //close connection
  client.close();
  console.log("disconnected");
};

dbfunction("exercise_1");
