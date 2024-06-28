const express = require('express');
const app = express();
require('dotenv').config();


const cors = require('cors');
const port = process.env.PORT || 8000;




// Middleware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
 res.send('BD Restaurant Server is running...')
})


app.listen(port, () => {
 console.log(`BD Restaurant Server is running on port ${port}`)
})
