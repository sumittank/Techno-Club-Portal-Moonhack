const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Student = require("../models/Student");

const { MongoClient } = require("mongodb");
// MongoDB Connection
const client = new MongoClient("mongodb://localhost:27017/");
const dbName = "resource_optimization";
const collectionName = "students";


router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch all students

router.get("/students", async (req, res) => {
  try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      
      const students = await collection.find({}).toArray();
      res.json(students);
  } catch (error) {
      console.error("Error fetching students ❌", error);
      res.status(500).json({ message: "Error fetching students" });
  } finally {
      await client.close();
  }
});

module.exports = router;
