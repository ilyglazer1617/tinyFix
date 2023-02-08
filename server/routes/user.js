const _ = require("lodash");
const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const { Car } = require("../models/Car");
const { User, validateRegister } = require("../models/User");

//! register
userRouter.post("/register", async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await new User(
    _.pick(req.body, [
      "full_name",
      "email",
      "password",
      "phone",
      "district",
      "car_make",
      "car_model",
      "car_year",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    user = await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//! get user info
userRouter.get("/:id", async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    res.status(200).send(userData);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! update user details
userRouter.put("/updateUser/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user.updateOne({ $set: req.body }, { new: true });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! delete accounte
userRouter.delete("/", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.id);
    res.status(200).send("user deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! get car make
userRouter.post("/getCarMake", async (req, res) => {
  try {
    const carMake = await Car.distinct("make");
    res.status(200).send(carMake);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! get car model by make
userRouter.post("/getCarModel", async (req, res) => {
  try {
    const carModels = await Car.find({ make: req.body.make });
    res.status(200).send(carModels);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//! get car info by model
userRouter.post("/getCarYear", async (req, res) => {
  try {
    const carYear = await Car.find({
      model: req.body.model,
      make: req.body.make,
    });
    res.status(200).send(carYear);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = userRouter;
