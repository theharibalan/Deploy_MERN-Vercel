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


app.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await RegisterModel.findOne({ email });
  
      if (existingUser) {
        res.json("Already have an account");
      } else {
        const newUser = await RegisterModel.create({ name, email, password });
        res.json(newUser);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  


app.listen(3001, () => {
    console.log("Server is Running")
})
