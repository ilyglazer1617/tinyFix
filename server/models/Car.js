const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  trim: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  generation: {
    type: String,
  },
  body: {
    type: String,
  },
  drive: {
    type: String,
  },
  gearbox: {
    type: String,
  },
  engine_type: {
    type: String,
  },
  engine_volume: {
    type: String,
  },
  engine_power: {
    type: String,
  },
  year: {
    type: String,
  },
});

const Car = new mongoose.model("Car", schema);

module.exports.Car = Car;
