const mongoose = require("mongoose");

const Garage = new mongoose.model(
    "Garage",
    new mongoose.Schema({
        garage_name: {
            type: String,
        },
        owner: {
            type: String,
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
        },
        city: {
            type: String,
        },
        street: {
            type: String,
        },
        street_number: {
            type: String,
        },
        zip_code: {
            type: String,
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        garage_info: {
            type: String,
        },
        image: {
            type: Object,
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                required: true,
            },
        },
        reviews: {
            prfessionalism: {
                type: [Number],
                default: [],
            },
            reliability: {
                type: [Number],
                default: [],
            },
            text: {
                type: [String],
                default: [],
            },
        },
        operation_time: {
            type: String,
        },
        licanse: {
            type: String,
        },
    })
);

// schema.methods.generateJWT = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
//     return token;
// };

module.exports = Garage;
