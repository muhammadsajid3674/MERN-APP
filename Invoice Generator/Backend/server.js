const express = require('express');
const path = require('path')
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("<h1>API LIVE</h1>")
})

app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`))