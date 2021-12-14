const { downloadAndParse } = require("./data");
const express = require("express");
const cors = require('cors');

async function run() {
    const locations = await downloadAndParse()
    const app = express();
    app.use(cors());

    app.get("/", (req, res) => {
        res.send("Hello World!");
    })

    app.get("/data", (req, res) => {
        res.json(locations);
    })

    app.listen(8000, () => {
        console.log("Server is running!")
    })
}

run();
