const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();
const PORT = process.env.PORT || 5000;

// Init middleware
app.use(logger);

// Gets all members
app.get("/api/members", (req, res) => res.json(members));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
