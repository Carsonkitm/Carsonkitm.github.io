const express = require("express");
const myCustomRoutes = require("./routes/user");

// Load express
const app = express();
const port = 3000;

// Use the routes in ./routes/user
// localhost3000/user_routes
app.use("/user_routes", myCustomRoutes);

// Demonstrate a route in index.js
app.get("/", (req, res) => {
    res.send("Hello World!");
})

// Normally we would not do this. usually a front end project manages hosting html pages
app.use(express.static("public"));

// Run the server
app.listen(port, () => {
    console.log("Server started on port " + port);
})