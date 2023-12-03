const express = require("express");
const app = express();
const PORT = 8082;
const mongoose = require("mongoose");
const MONGODB_URI = "mongodb://127.0.0.1:27017/userDB";
const cors = require("cors");

let authRoutes = require("./router/auth.router");

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to DB :) ...`);
  })
  .catch((e) => console.log(`Failed to connect to DB :( ...${e}`));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
