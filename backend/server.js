const Student = require("../backend/models/Student");

const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const axios = require("axios");

const usersRoutes = require("./routes/users");
const authRoutes = require('./routes/authRoutes');
const allocationRoutes = require("./routes/allocation")
const resourcesRoutes = require("./routes/resources")


dotenv.config();

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });





app.use('/api/auth', authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api", allocationRoutes);
app.use("/api", resourcesRoutes);

const PYTHON_API_URL = "http://localhost:5001/extract"; // URL for Python API
const PYTHON_API_URL1 = "http://localhost:5002/predict"; 

// Endpoint to send text to Python API
app.post("/extract", async (req, res) => {
    try {
        const { text } = req.body;
        console.log(text)
        const response = await axios.post(PYTHON_API_URL, { text });
        res.json(response.data);
        console.log(response.data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing text" });
    }
});
app.post("/predict-ai-score", async (req, res) => {
    try {
        const { student_id,total_events_attended, total_events_hosted, years_since_joining, events_organized } = req.body;
        console.log(req.body)
        // Send request to Flask API
        const response = await axios.post(PYTHON_API_URL1, {
            total_events_attended,
            total_events_hosted,
            years_since_joining,
            events_organized
        });

        
        const predictedScore = response.data["AI Credit Score"];

        // Send Flask response to frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with AI Credit Score API:", error);
        res.status(500).json({ error: "Failed to fetch AI Credit Score" });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
