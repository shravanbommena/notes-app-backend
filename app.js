// app.js
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
