const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./conn")

// const postRoutes = require("./routes/postRoutes")

const app = express();
connectDB()
const port = 5000;

app.use(express.json())
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