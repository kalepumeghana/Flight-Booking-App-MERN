import mongoose from "mongoose";

// USER SCHEMA
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    usertype: { type: String, required: true },
    password: { type: String, required: true },
    approval: { type: String, default: 'approved' }
});

// FLIGHT SCHEMA
const flightSchema = new mongoose.Schema({
    flightName: { type: String, required: true },
    flightId: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    basePrice: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    operatorName: {type: String, required: true }
});

// BOOKING SCHEMA
const bookingSchema = new mongoose.Schema({
    user: { type: String, required: true },
    flight: { type: String },

    flightName: { type: String, required: true },
    flightId: { type: String, required: true },

    departure: { type: String, required: true },
    destination: { type: String, required: true },

    email: { type: String },
    mobile: { type: String },

    seats: { type: String },

    passengers: [{
        name: { type: String },
        age: { type: Number }
    }],

    totalPrice: { type: Number, required: true },

    bookingDate: { type: Date, default: Date.now },
    journeyDate: { type: Date, required: true },
    journeyTime: { type: String },

    seatClass: { type: String },

    bookingStatus: {
        type: String,
        default: "confirmed"
    }
});

// MODELS
export const User = mongoose.model('users', userSchema);
export const Flight = mongoose.model('flights', flightSchema);
export const Booking = mongoose.model('bookings', bookingSchema);