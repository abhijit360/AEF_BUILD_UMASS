const express = require("express");
const mongoose = require("mongoose");
// const db = require("./conn.mjs")

// const postRoutes = require("./routes/postRoutes")

const app = express();
const port = 5000;

app.use("/api/post", require("./routes/postRoutes"))

app.get('/api', (req, res) => {
    res.json({
    message: 'Hello World!'
    });
});

app.listen(port, ()=>{
    console.log(`Running Application on port ${port}`)
})




// module.exports = DBconnection