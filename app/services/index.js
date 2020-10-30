/* eslint-disable no-unused-vars */
"use strict";

const moment = require("moment");

function calculateTime(object) {
  let date = new Date(`2020-10-28T${object.time}Z`);
  let time = moment(date)
    .utc()
    .add(-1 * object.timezone, "hours")
    .format("HH:mm:ss");
  return { time, timezone: "utc" };
}

module.exports = { calculateTime };
