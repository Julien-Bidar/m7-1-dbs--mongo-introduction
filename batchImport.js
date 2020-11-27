const fs = require("file-system");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const assert = require("assert");

const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));

const batchImport = async () => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");

    const result = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, result.insertedCount);

    console.log("success", greetings);
  } catch (err) {
    console.log(err.stack);
  }
};

batchImport();
