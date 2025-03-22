const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const router = express.Router();
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const db = client.db("resource_optimization");
const q_table = db.collection("q_table");
const resources = db.collection("resources");


const ACTIONS = { "0": "Allocate", "1": "Deny", "2": "Alternative Allocate", "3": "Waitlist" };


const LEARNING_RATE = 0.1;
const DISCOUNT_FACTOR = 0.9;

// ✅ Reward Function
function getReward(action, available_units) {
    if (action === "0") return available_units > 0 ? 10 : -5; 
    if (action === "1") return -10;
    if (action === "2") return 5;  
    if (action === "3") return 3;  
    return 0;
}

async function updateQValues(club_name, resource_name, action) {
    const qData = await q_table.findOne({ club_name, resource: resource_name });

    if (!qData) return;  

    const qValues = qData.q_values;
    const oldQ = qValues[action] || 0;
    const nextMaxQ = Math.max(...Object.values(qValues));
    
    const resource = await resources.findOne({ resource_name });
    const reward = getReward(action, resource?.available_units || 0);

    const newQ = oldQ + LEARNING_RATE * (reward + DISCOUNT_FACTOR * nextMaxQ - oldQ);
    qValues[action] = parseFloat(newQ.toFixed(4));

    await q_table.updateOne(
        { club_name, resource: resource_name },
        { $set: { q_values: qValues } }
    );
}

router.post("/allocate", async (req, res) => {
    const { club_name, resource_name } = req.body;

    try {
        await client.connect();


        const qData = await q_table.findOne({ club_name, resource: resource_name });
        if (!qData) {
            return res.status(404).json({ message: `❌ No Q-values for ${club_name} and ${resource_name}.` });
        }

        const qValues = qData.q_values;
        const bestAction = Object.keys(qValues).reduce((a, b) => (qValues[a] > qValues[b] ? a : b));


        const resource = await resources.findOne({ resource_name });
        if (!resource) {
            return res.status(404).json({ message: `❌ Resource ${resource_name} not found.` });
        }

        if (bestAction === "1") {
            await updateQValues(club_name, resource_name, "1"); // Update Q-values
            return res.json({ message: `🔴 Request Denied for ${club_name} (Resource: ${resource_name}).` });
        }

        if (bestAction === "0" && resource.available_units > 0) {
            await resources.updateOne(
                { resource_name },
                { $inc: { available_units: -1 } }
            );
            await updateQValues(club_name, resource_name, "0");
            return res.json({ message: `✅ Resource '${resource_name}' allocated to ${club_name}!` });
        }

        if (bestAction === "2") {
            await updateQValues(club_name, resource_name, "2");
            return res.json({ message: `🔄 Suggested alternative for ${club_name}: Try another resource.` });
        }

        if (bestAction === "3") {
            await updateQValues(club_name, resource_name, "3");
            return res.json({ message: `⏳ ${club_name} is waitlisted for ${resource_name}.` });
        }

        return res.json({ message: `⚠️ No valid allocation decision.` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
