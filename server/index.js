const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model')
const PORT = 8000;

app.use(cors());
app.use(express.json());

const url = `mongodb+srv://ash24pal:12345@cluster0.izxkmgv.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.post("/api/register", async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.json({ status: "ok" })
    } catch {
        res.json({ status: 'error', error: 'Duplicate email' });
    }
});

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({ name: req.body.name, password: req.body.password });
    if(user) {
        res.json({ status: 'ok', user: true });
    } else {
        res.json({ status: 'error', user: false })
    }
});

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT ${PORT}`);
})