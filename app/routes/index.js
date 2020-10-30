"use strict";

// Express.js Router
const routes = require("express").Router();
const { calculateTime } = require("../services");

// Routes
const postTime = async (req, res) => {
  try {
    let object = req.body;
    const response = calculateTime(object);
    res.send(response);
  } catch (e) {
    res.send({
      error: "Not Found",
      code: 404,
    });
  }
};

routes.post("/calculate-time", postTime);

module.exports = routes;
