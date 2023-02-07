const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const schema = new mongoose.Schema({
  full_name: {
    type: String,
    maxlength: 50,
    minlength: 2,
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
    minlength: 2,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 1024,
    minlength: 5,
    required: true,
  },
  phone: {
    type: String,
    maxlength: 10,
    minlength: 9,
    unique: true,
    required: true,
  },
  district: {
    type: String,
    enum: [
      "מחוז הצפון",
      "מחוז חיפה",
      "מחוז תל אביב",
      "מחוז המרכז",
      "מחוז ירושלים",
      "מחוז הדרום",
      "מחוז יהודה ושומרון",
    ],
    required: true,
  },

  car_make: {
    type: String,
    required: true,
  },
  car_model: {
    type: String,
  },
  car_year: {
    type: String,
  },
});

schema.methods.generateJWT = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

const User = new mongoose.model("User", schema);

function validateRegister(user) {
  const schema = {
    full_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(9).max(10).required(),
    district: Joi.string().required(),
    car_make: Joi.string().required(),
    car_model: Joi.string().required(),
    car_year: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}

function validateLogIn(userlog) {
  const schema1 = {
    email: Joi.string().min(4).max(255).required(),
    password: Joi.string().min(4).max(255).required(),
  };

  return Joi.validate(userlog, schema1);
}

module.exports.validateRegister = validateRegister;
module.exports.validationLogIn = validateLogIn;
module.exports.User = User;
