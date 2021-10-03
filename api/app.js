const express = require('express');
const app = express();
const cors = require('cors');

const data = require('./stub.json')

app.use(cors());

app.use(express.json());

app.get("/getCalendarEvents", (req, res) => {
    res.json(data);
});


app.listen(4000, () => { console.log("api server running on port 4000") });
