const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
app.use(cors(
    {
        origin: ["https://deploy-mern-vercel-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect('mongodb+srv://srsharibalan2003:JWPXHm3ZejPtxAWr@vercel-mern.ade86.mongodb.net/?retryWrites=true&w=majority&appName=vercel-mern');


app.get("/", (req, res) => {
    res.json("Hello");
})

app.post('/register', async (req, res) => {
    try {
        // Your registration logic here
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Validate input data
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(409).json({ message: "Already have an account" });
            } else {
                // Create new user
                RegisterModel.create({ name: name, email: email, password: password })
                    .then(result => res.status(201).json(result))
                    .catch(err => {
                        console.error('Error creating user:', err);
                        res.status(500).json({ error: "Internal Server Error" });
                    });
            }
        })
        .catch(err => {
            console.error('Error checking user existence:', err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});



app.listen(3001, () => {
    console.log("Server is Running")
})
