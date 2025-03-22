const express = require("express");
const { MongoClient } = require("mongodb");

const router = express.Router();
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

// 📌 API to fetch resources data
router.get("/resource-data", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("resource_optimization");
        const resources = db.collection("resources");
        const data = await resources.find().toArray();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    } finally {
        await client.close();
    }
});

module.exports = router;
