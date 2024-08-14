const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For hashing passwords
const RegisterModel = require('./models/Register');

const app = express();

// Middleware
app.use(cors({
    origin: ["https://deploy-mern-vercel-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://srsharibalan2003:JWPXHm3ZejPtxAWr@vercel-mern.ade86.mongodb.net/?retryWrites=true&w=majority&appName=vercel-mern', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await RegisterModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "Already have an account" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await RegisterModel.create({ name: name, email: email, password: hashedPassword });
        return res.status(201).json(newUser);
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Start the Server
app.listen(3001, () => {
    console.log("Server is Running on port 3001");
});
