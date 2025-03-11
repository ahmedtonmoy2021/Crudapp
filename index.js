const express = require('express')
const app = express()
const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send('hello node api')
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})



mongoose.connect("mongodb+srv://ahmedtonmoy:admin@tonmoy.qi8qj.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=Tonmoy")
.then(() => {
    console.log('connected to the database');
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    });
})
.catch( () => {
    console.log('not connected!');
})
