const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./conn")
const cors = require("cors");
// const postRoutes = require("./routes/postRoutes")
const PostRouter = require("./routes/postRoutes");
const SponsorRouter = require("./routes/sponsorRoutes");
const GrantRouter = require("./routes/grantRoutes");
const EboardRouter = require("./routes/EBoardRoutes");
const uploadRouter = require("./routes/uploadImages");

const app = express();
connectDB()
const port = 5000;

// to handle CORS
app.use(cors());

app.use(express.json())
app.use("/api/post", PostRouter)
app.use("/api/sponsors/", SponsorRouter)
app.use("/api/grants/", GrantRouter)
app.use("/api/Eboard/", EboardRouter)
app.use("/api/image/", uploadRouter)

app.get('/api', (req, res) => {
    res.json({
    message: 'Hello World!'
    });
});

app.listen(port, ()=>{
    console.log(`Running Application on port ${port}`)
})




// module.exports = DBconnection