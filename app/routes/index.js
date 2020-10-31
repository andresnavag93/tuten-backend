"use strict";

// Express.js Router
const routes = require("express").Router();
const { calculateTime } = require("../services");

// Routes
const postTime = async (req, res) => {
  try {
    let object = req.body;
    const response = calculateTime(object);
    if (response.error) {
      res.status(400).send(response);
    } else {
      res.send(response);
    }
    // res.send(response);
  } catch (e) {
    res.send({
      error: "Not Found",
      code: 404,
    });
  }
};

routes.post("/calculate-time", postTime);

module.exports = routes;
