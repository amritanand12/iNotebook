const connectToMongo = require('./db');
const express = require('express')
const app = express()
var cors = require('cors')
require("dotenv").config();
const port = process.env.PORT || 5000
connectToMongo(process.env.CONNECTION_STRING);
// console.log(process.env.CONNECTION_STRING);

//If you want to use req.body, then we need to use middleware function
app.use(express.json())
app.use(cors())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/note', require('./routes/note'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})