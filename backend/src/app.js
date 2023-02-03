const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routers");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

app.use("/api", router);
app.use("/", (req, res) => {
  res.send("welcome to my app");
});

module.exports = app;
