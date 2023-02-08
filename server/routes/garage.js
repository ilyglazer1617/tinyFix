const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express.Router();
const Garage = require("../models/Garage");

const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
    cloud_name: "dzbxzzc0q",
    api_key: "495238798112886",
    api_secret: "e734BVzI-D26tMOO48-MPwswTXI",
});

//!  ============garage register=====================

app.post("/register", async function (req, res) {
    const { error } = registerValidate(req.body);
    if (error) {
        res.status(400).send(error);
    } else {
        const password = await bcrypt.hash(req.body.password, 10);
        const image = req.body.image;
        console.log("image");
        try {
            //upload img to cloudinary
            const imgUploud = await cloudinary.uploader.upload(image, {
                folder: "garages",
                // width: 300,
                // crop: "scale",
            });

            const garage = new Garage({
                garage_name: req.body.garage_name,
                owner: req.body.owner,
                district: req.body.district,
                city: req.body.city,
                street: req.body.street,
                street_number: req.body.street_number,
                zip_code: req.body.zip_code,
                phone: req.body.phone,
                email: req.body.email,
                password: password,
                garage_info: req.body.garage_info,
                image: {
                    public_id: imgUploud.public_id,
                    url: imgUploud.secure_url,
                },
                operation_time: req.body.operation_time,
                licanse: req.body.licanse,
            });
            const result = await garage.save();
            console.log("i got all the way here");
            res.send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});
//? Garage register Joi validation:

function registerValidate(garage) {
    const garageSchema = {
        garage_name: Joi.string().required(),
        owner: Joi.string().required(),
        district: Joi.string()
            .valid([
                "מחוז הצפון",
                "מחוז חיפה",
                "מחוז תל אביב",
                "מחוז המרכז",
                "מחוז ירושלים",
                "מחוז הדרום",
                "מחוז יהודה ושומרון",
            ])
            .required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        street_number: Joi.string().required(),
        zip_code: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        garage_info: Joi.string().required(),
        image: Joi.string().allow(""),
        reviews: Joi.object({
            professionalism: Joi.array().items(Joi.number()).default([]),
            reliability: Joi.array().items(Joi.number()).default([]),
            pricing: Joi.array().items(Joi.number()).default([]),
        }),
        operation_time: Joi.string().required(),
        licanse: Joi.string().required(),
    };

    return Joi.validate(garage, garageSchema);
}

//!  ============garage login=====================

app.post("/login", async function (req, res) {
    const { error } = loginValidate(req.body);
    if (error) {
        res.status(400).send(error);
    } else {
        try {
            const garage = await Garage.find({ email: req.body.email });
            console.log(garage);
            if (garage === []) {
                res.status(400).send("email or password are incorrect");
            } else {
                const password = await bcrypt.compare(req.body.password, garage[0].password);
                password === true
                    ? res.send("access granted")
                    : res.status(869).send("There is no way you are here");
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});

//? Garage login Joi validation

function loginValidate(garage) {
    const garageSchema = {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    };
    return Joi.validate(garage, garageSchema);
}

//!=====================Get All Garages=========================

app.get("/", async (req, res) => {
    try {
        const garages = await Garage.find();
        res.send(garages);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//!=====================Find Garage Info By Id=====================
app.get("/:garage_id", async (req, res) => {
    try {
        const garageData = await Garage.findById(req.params.garage_id);
        res.send(garageData);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//!======================Update Garage Info=======================

app.put("/:garage_id", async function (req, res) {
    const { error } = updateValidate(req.body);
    if (error) {
        res.status(400).send(error.message);
    } else {
        const password = await bcrypt.compare(req.body.password, garage[0].password);
        try {
            const updateData = await Garage.findOneAndUpdate(
                { _id: req.params.garage_id },
                {
                    $set: {
                        garage_name: req.body.garage_name,
                        owner: req.body.owner,
                        district: req.body.district,
                        city: req.body.city,
                        street: req.body.street,
                        street_number: req.body.street_number,
                        zip_code: req.body.zip_code,
                        phone: req.body.phone,
                        password: password,
                        garage_info: req.body.garage_info,
                        img: req.body.img,
                        operation_time: req.body.operation_time,
                        licanse: req.body.licanse,
                    },
                },
                { new: true }
            );
            res.send(updateData);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
});

//? update garage info Joi validation

function updateValidate(garage) {
    const garageSchema = {
        garage_name: Joi.string().required(),
        owner: Joi.string().required(),
        district: Joi.string()
            .valid([
                "מחוז הצפון",
                "מחוז חיפה",
                "מחוז תל אביב",
                "מחוז המרכז",
                "מחוז ירושלים",
                "מחוז הדרום",
                "מחוז יהודה ושומרון",
            ])
            .required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        street_number: Joi.string().required(),
        phone: Joi.string().required(),
        garage_info: Joi.string().required(),
        password: Joi.string().required(),
        img: Joi.string().allow(""),
        operation_time: Joi.string().required(),
        licanse: Joi.boolean().required(),
    };

    return Joi.validate(garage, garageSchema);
}

//!==================Delete Garage=====================

app.delete("/:garage_id", async function (req, res) {
    try {
        const deletedAccount = await Garage.findByIdAndDelete(req.params.garage_id);
        res.send(deletedAccount);
    } catch (error) {
        res.status(400).send(error.message);
    }
});






























//!=================reviews on garage======================


app.post("/addReviews/:garage_id", async function (req, res) {
    
})


module.exports = app;
