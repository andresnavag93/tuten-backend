/* eslint-disable no-unused-vars */
"use strict";

/** API Modules */
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

/** Configuration File */
const config = require("./config/config");

/** Colors to terminal */
const chalk = require("chalk");

/** Middlewares */
const bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();
app.use(bodyParser.json());

app.use(function (req, res, next) {
  // FIXME: Revisar como debe ir en caso de produccion
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/** Require routes */
const routes = require("./routes");

app.use("/", routes);
app.get("/", (req, res) => {
  res.send({ info: "Node.js, Express, and Postgres API" });
});

/** Express error handler */
app.use((err, req, res, next) => {
  console.log(err);
  if (err.status === 401) {
    return res.status(err.status).send({ error: "Error 401" });
  }
  if (err.status === 403) {
    return res.status(err.status).send({ error: "Error 403" });
  }
  if (err.status === 404) {
    return res.status(err.status).send({ error: "Error 404" });
  }
  res.status(500).send({ error: "Internal Error Server" });
});

/** Express Initialization */
function initExpress() {
  console.log(`${chalk.green("[Tuten Backend]:")} Initializing Express...`);
  server.listen(config.port, () => {
    console.log(`${chalk.green("[Tuten Backend]:")} Running on port ${chalk.green(config.port)}!`);
  });
}

// Error management
function handleFatalError(err) {
  console.error(`${chalk.red("[Tuten Backend]:")} fatal error: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}

/** Runs Bison API if file hasn't been required */
if (!module.parent) {
  initExpress();
  process.on("uncaughtException", handleFatalError);
  process.on("unhandledRejection", handleFatalError);
}

/** Exports Express server for tests */
module.exports = server;
