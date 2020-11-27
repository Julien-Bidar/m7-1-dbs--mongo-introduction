const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const assert = require("assert");

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");

    const result = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, result.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
};

const getGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  const db = client.db("exercise_1");
  const _id = req.params._id;
  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const { start, limit } = req.query;
  let numStart = Number(start);
  let numLimit = Number(limit);

  const db = client.db("exercise_1");

  const greetings = await db.collection("greetings").find().toArray();
  if (numStart + numLimit > greetings.length) {
    numLimit = greetings.length - numStart;
  }
  if (numStart <= 0 || !numStart) {
    numStart = 0;
  }
  if (numLimit <= 0 || !numLimit) {
    numLimit = 25;
  }

  const greetingsSliced = greetings.slice(numStart, numStart + numLimit);

  if (greetings) {
    res.status(200).json({ status: 200, data: greetingsSliced });
  } else {
    res.status(404).json({ status: 404, message: "error" });
  }
};

const deleteGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");

    const greeting = req.params._id;
    console.log(greeting);
    const result = await db
      .collection("greetings")
      .deleteOne({ _id: greeting });
    assert.equal(1, result.deletedCount);

    res.status(204).json({ status: 204, message: "deleted" });
  } catch (err) {
    console.log(err.stack);
  }
};

const updateGreeting = async (req, res) => {
  const { hello } = req.body;
  const _id = req.params._id;
  const query = { _id };
  const newValue = { $set: { hello } };

  if (!hello) {
    res.status(400).json({
      status: 400,
      data: req.body,
      message: "you can only update Hello",
    });
    return;
  }

  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("exercise_1");

    const greeting = req.params._id;
    console.log(greeting);
    const result = await db.collection("greetings").updateOne(query, newValue);
    assert.equal(1, result.matchedCount);
    assert.equal(1, result.modifiedCount);

    res.status(201).json({ status: 201, _id });
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

module.exports = {
  createGreeting,
  getGreeting,
  getGreetings,
  deleteGreeting,
  updateGreeting,
};
